/// <reference types="node" />
import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from "url"

// ── Types ────────────────────────────────────────────────────────────
type SignalDirection = "up" | "down" | "flat"
type SignalCard = {
  id: string
  title: string
  signal: SignalDirection
  state: string
  context?: string
}

// ── Helpers ──────────────────────────────────────────────────────────
function toSignal(change: number, threshold: number): SignalDirection {
  if (change > threshold) return "up"
  if (change < -threshold) return "down"
  return "flat"
}

function fmt(n: number): string {
  const sign = n >= 0 ? "+" : ""
  return `${sign}${n.toFixed(1)}%`
}

const stateLabels: Record<string, Record<SignalDirection, string>> = {
  "network-activity": { up: "Heating up", flat: "Normal range", down: "Cooling down" },
  "defi-momentum":    { up: "Inflow",     flat: "Flat",         down: "Outflow" },
  "user-demand":      { up: "Demand rising", flat: "Steady",    down: "Demand falling" },
  "attention":        { up: "Fee spike",  flat: "Normal",       down: "Fees dropping" },
}

// ── Data Fetchers ────────────────────────────────────────────────────

/** Dune Analytics — Network Activity + DeFi Momentum + User Demand */
async function fetchDune() {
  const apiKey = process.env.DUNE_API_KEY
  if (!apiKey) {
    console.warn("  ⚠ DUNE_API_KEY not set — skipping Dune")
    return null
  }
  const { DuneClient } = await import("@duneanalytics/client-sdk")
  const dune = new DuneClient(apiKey)
  const result = await dune.getLatestResult({ queryId: 6663338 })
  const rows = result.result?.rows as Record<string, unknown>[] | undefined
  if (!rows?.length) {
    console.warn("  ⚠ Dune returned no rows")
    return null
  }
  return rows[0]
}

/** DeFi Llama — daily fee comparison */
async function fetchFees(): Promise<{ today: number; yesterday: number } | null> {
  const res = await fetch("https://api.llama.fi/summary/fees/solana?dataType=dailyFees")
  if (!res.ok) throw new Error(`DeFi Llama fees: ${res.status}`)
  const data = await res.json() as Record<string, unknown>
  const today = Number(data.total24h)
  const yesterday = Number(data.total48hto24h)
  if (!today || !yesterday) return null
  return { today, yesterday }
}

/** DeFi Llama — top Solana protocol by 1d TVL change */
async function fetchTopProtocol(): Promise<{ name: string; change: number; tvl: number } | null> {
  const res = await fetch("https://api.llama.fi/protocols")
  if (!res.ok) throw new Error(`DeFi Llama protocols: ${res.status}`)
  const protocols = await res.json() as Record<string, unknown>[]
  const solana = protocols
    .filter((p) =>
      Array.isArray(p.chains) &&
      (p.chains as string[]).includes("Solana") &&
      typeof p.change_1d === "number" &&
      (p.change_1d as number) > 5 &&
      typeof p.tvl === "number" &&
      (p.tvl as number) > 1_000_000 // ignore tiny protocols (<$1M TVL)
    )
    .sort((a, b) => (b.change_1d as number) - (a.change_1d as number))

  if (!solana.length) return null
  const top = solana[0]
  return { name: top.name as string, change: top.change_1d as number, tvl: top.tvl as number }
}

/** Solana RPC — recent performance samples for slot time / congestion */
async function fetchPerformance(): Promise<{ avgSlotMs: number } | null> {
  const res = await fetch("https://api.mainnet-beta.solana.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getRecentPerformanceSamples",
      params: [20],
    }),
  })
  if (!res.ok) throw new Error(`Solana RPC: ${res.status}`)
  const data = await res.json() as { result?: Array<{ numSlots: number; samplePeriodSecs: number }> }
  const samples = data.result
  if (!samples?.length) return null
  const avgSlotMs =
    samples.reduce((sum, s) => sum + (s.samplePeriodSecs * 1000) / s.numSlots, 0) / samples.length
  return { avgSlotMs }
}

// ── Markdown Generation ──────────────────────────────────────────────

const signalArrow: Record<SignalDirection, string> = { up: "↑", flat: "→", down: "↓" }

function generatePulseMd(snapshot: { date: string; signals: SignalCard[] }): string {
  const { date, signals } = snapshot

  const rows = signals
    .map((s) => `| ${s.title} | ${signalArrow[s.signal]} ${s.signal} | ${s.state} | ${s.context ?? "—"} |`)
    .join("\n")

  const summaryParts = signals.map((s) => {
    if (s.id === "protocol-highlight") return `${s.state} (${s.context})`
    return `${s.title}: ${s.state} (${s.context ?? "no data"})`
  })

  return `---
title: Solana Pulse Signals
date: ${date}
source: https://solanapulse.live
---

# Solana Pulse — ${date}

Daily health signals for the Solana ecosystem.
Each signal is a directional delta (up/flat/down), not an absolute value.

## Current Signals

| Signal | Direction | State | Context |
|--------|-----------|-------|---------|
${rows}

## Data

\`\`\`jsonc
${JSON.stringify(snapshot, null, 2)}
\`\`\`

### Field Descriptions

#### date
Type: \`string\`
ISO date (YYYY-MM-DD) when signals were generated.

#### signals
Type: \`SignalCard[]\`
Array of signal card objects.

#### signals[].id
Type: \`string\`
One of: network-activity, defi-momentum, user-demand, attention, protocol-highlight, stability.

#### signals[].signal
Type: \`"up" | "flat" | "down"\`
Directional signal based on threshold analysis.

#### signals[].state
Type: \`string\`
Human-readable state phrase (e.g. "Heating up", "Outflow", "Stable").

#### signals[].context
Type: \`string\`
Delta context with percentage (e.g. "+5.2% vs 7d avg").

## Summary

${summaryParts.join(". ")}.

## More Info

- Website: https://solanapulse.live
- Docs for AI agents: https://solanapulse.live/llms.txt
`
}

// ── Main ─────────────────────────────────────────────────────────────
async function main() {
  console.log("Fetching Solana Pulse data…\n")

  const [dune, fees, topProtocol, perf] = await Promise.allSettled([
    fetchDune(),
    fetchFees(),
    fetchTopProtocol(),
    fetchPerformance(),
  ])

  const signals: SignalCard[] = []

  // ─── 1. Network Activity (Dune) ───
  const duneRow = dune.status === "fulfilled" ? dune.value : null
  if (duneRow) {
    const txChange = Number(duneRow.weekly_transactions_change)
    const addrChange = Number(duneRow.weekly_active_addresses_change)
    const delta = (txChange + addrChange) / 2
    const sig = toSignal(delta, 3)
    signals.push({
      id: "network-activity",
      title: "Network Activity",
      signal: sig,
      state: stateLabels["network-activity"][sig],
      context: `${fmt(delta)} vs 7d avg`,
    })
    console.log(`  ✓ Network Activity: ${sig} (${fmt(delta)})`)
  } else {
    signals.push({ id: "network-activity", title: "Network Activity", signal: "flat", state: "No data", context: "Dune unavailable" })
    console.log("  ✗ Network Activity: no data")
  }

  // ─── 2. DeFi Momentum (Dune) ───
  if (duneRow) {
    const tvlChange = Number(duneRow.daily_tvl_usd_change)
    const sig = toSignal(tvlChange, 2)
    signals.push({
      id: "defi-momentum",
      title: "DeFi Momentum",
      signal: sig,
      state: stateLabels["defi-momentum"][sig],
      context: `${fmt(tvlChange)} TVL (24h)`,
    })
    console.log(`  ✓ DeFi Momentum: ${sig} (${fmt(tvlChange)})`)
  } else {
    signals.push({ id: "defi-momentum", title: "DeFi Momentum", signal: "flat", state: "No data", context: "Dune unavailable" })
    console.log("  ✗ DeFi Momentum: no data")
  }

  // ─── 3. User Demand (derived from Dune: tx growth vs wallet growth) ───
  if (duneRow) {
    const txChange = Number(duneRow.weekly_transactions_change)
    const addrChange = Number(duneRow.weekly_active_addresses_change)
    const demandDelta = txChange - addrChange // tx growing faster than users = rising demand
    const txPerWallet = Number(duneRow.weekly_transactions) / Number(duneRow.weekly_active_addresses)
    const sig = toSignal(demandDelta, 5)
    signals.push({
      id: "user-demand",
      title: "User Demand",
      signal: sig,
      state: stateLabels["user-demand"][sig],
      context: `${fmt(demandDelta)} tx/wallet delta · ${txPerWallet.toFixed(1)} tx/wallet`,
    })
    console.log(`  ✓ User Demand: ${sig} (${fmt(demandDelta)})`)
  } else {
    signals.push({ id: "user-demand", title: "User Demand", signal: "flat", state: "No data", context: "Dune unavailable" })
    console.log("  ✗ User Demand: no data")
  }

  // ─── 4. Attention / Fees (DeFi Llama) ───
  if (fees.status === "fulfilled" && fees.value) {
    const { today, yesterday } = fees.value
    const feeDelta = ((today - yesterday) / yesterday) * 100
    const sig = toSignal(feeDelta, 5)
    signals.push({
      id: "attention",
      title: "Attention / Fees",
      signal: sig,
      state: stateLabels["attention"][sig],
      context: `${fmt(feeDelta)} fee delta (24h)`,
    })
    console.log(`  ✓ Attention / Fees: ${sig} (${fmt(feeDelta)})`)
  } else {
    const reason = fees.status === "rejected" ? fees.reason?.message : "incomplete data"
    signals.push({ id: "attention", title: "Attention / Fees", signal: "flat", state: "No data", context: "API unavailable" })
    console.log(`  ✗ Attention / Fees: ${reason}`)
  }

  // ─── 5. Protocol Highlight (DeFi Llama) ───
  if (topProtocol.status === "fulfilled" && topProtocol.value) {
    const { name, change, tvl } = topProtocol.value
    const tvlStr = tvl >= 1e9 ? `$${(tvl / 1e9).toFixed(1)}B` : `$${(tvl / 1e6).toFixed(0)}M`
    signals.push({
      id: "protocol-highlight",
      title: "Protocol Highlight",
      signal: "up",
      state: `${name} surging`,
      context: `${fmt(change)} TVL (24h) · ${tvlStr}`,
    })
    console.log(`  ✓ Protocol Highlight: ${name} (${fmt(change)}, ${tvlStr})`)
  } else {
    signals.push({ id: "protocol-highlight", title: "Protocol Highlight", signal: "flat", state: "No standout", context: "No anomalous growth" })
    console.log("  ✗ Protocol Highlight: no standout protocol")
  }

  // ─── 6. Stability (Solana RPC) ───
  if (perf.status === "fulfilled" && perf.value) {
    const { avgSlotMs } = perf.value
    const drift = ((avgSlotMs - 400) / 400) * 100
    let sig: SignalDirection, state: string
    if (drift > 10) {
      sig = "up"; state = "Congested"        // slot times way above target
    } else if (drift < -5) {
      sig = "down"; state = "Fast & smooth"   // running faster than target
    } else {
      sig = "flat"; state = "Stable"
    }
    signals.push({
      id: "stability",
      title: "Stability",
      signal: sig,
      state,
      context: `${avgSlotMs.toFixed(0)}ms avg slot (400ms target)`,
    })
    console.log(`  ✓ Stability: ${sig} (${avgSlotMs.toFixed(0)}ms avg slot)`)
  } else {
    signals.push({ id: "stability", title: "Stability", signal: "flat", state: "Stable", context: "RPC unavailable" })
    console.log("  ✗ Stability: RPC unavailable")
  }

  // ─── Write JSON ───
  const snapshot = { date: new Date().toISOString().slice(0, 10), signals }
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const outPath = path.resolve(__dirname, "..", "src", "lib", "pulse-data.json")
  fs.writeFileSync(outPath, JSON.stringify(snapshot, null, 2) + "\n")
  console.log(`\n✅ Written to src/lib/pulse-data.json`)
  console.log(JSON.stringify(snapshot, null, 2))

  // ─── Write pulse.md (AI-agent readable) ───
  const mdPath = path.resolve(__dirname, "..", "public", "pulse.md")
  fs.writeFileSync(mdPath, generatePulseMd(snapshot))
  console.log(`✅ Written to public/pulse.md`)
}

main().catch((err) => {
  console.error("Fatal:", err)
  process.exit(1)
})
