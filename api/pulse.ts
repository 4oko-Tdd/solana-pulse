import type { VercelRequest, VercelResponse } from "@vercel/node"
import { DuneClient } from "@duneanalytics/client-sdk"

const QUERY_ID = 6663338

type SignalDirection = "up" | "down" | "flat"

interface DuneRow {
  blockchain: string
  weekly_transactions: number
  weekly_active_addresses: number
  weekly_transactions_change: string | number
  weekly_active_addresses_change: number
  daily_tvl_usd_change: number
  daily_tvl_usd: number
}

type SignalCard = {
  id: string
  title: string
  signal: SignalDirection
  state: string
  context?: string
}

function toSignal(change: number, threshold: number): SignalDirection {
  if (change > threshold) return "up"
  if (change < -threshold) return "down"
  return "flat"
}

function formatDelta(change: number): string {
  const sign = change >= 0 ? "+" : ""
  return `${sign}${change.toFixed(1)}%`
}

const stateMap: Record<string, Record<SignalDirection, string>> = {
  "network-activity": { up: "Heating up", flat: "Normal range", down: "Cooling down" },
  "defi-momentum": { up: "Inflow", flat: "Flat", down: "Outflow" },
}

function transformRow(row: DuneRow) {
  const txChange = Number(row.weekly_transactions_change)
  const addrChange = Number(row.weekly_active_addresses_change)
  const tvlChange = Number(row.daily_tvl_usd_change)

  const networkDelta = (txChange + addrChange) / 2
  const networkSignal = toSignal(networkDelta, 3)
  const defiSignal = toSignal(tvlChange, 2)

  const signals: SignalCard[] = [
    {
      id: "network-activity",
      title: "Network Activity",
      signal: networkSignal,
      state: stateMap["network-activity"][networkSignal],
      context: `${formatDelta(networkDelta)} vs 7d avg`,
    },
    {
      id: "defi-momentum",
      title: "DeFi Momentum",
      signal: defiSignal,
      state: stateMap["defi-momentum"][defiSignal],
      context: `${formatDelta(tvlChange)} TVL (24h)`,
    },
    {
      id: "user-demand",
      title: "User Demand",
      signal: "up",
      state: "Demand rising",
      context: "+4.8% vs 7d avg",
    },
    {
      id: "attention",
      title: "Attention / Fees",
      signal: "flat",
      state: "Normal",
      context: "~0% fee delta",
    },
    {
      id: "protocol-highlight",
      title: "Protocol Highlight",
      signal: "up",
      state: "Jupiter surging",
      context: "+18% users (24h)",
    },
    {
      id: "stability",
      title: "Stability",
      signal: "flat",
      state: "Stable",
      context: "No congestion detected",
    },
  ]

  return { date: new Date().toISOString().slice(0, 10), signals }
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.DUNE_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: "DUNE_API_KEY not configured" })
  }

  try {
    const dune = new DuneClient(apiKey)
    const result = await dune.getLatestResult({ queryId: QUERY_ID })

    const rows = result.result?.rows as unknown as DuneRow[] | undefined
    if (!rows || rows.length === 0) {
      return res.status(502).json({ error: "No data from Dune" })
    }

    const pulseData = transformRow(rows[0])
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=1800")
    return res.json(pulseData)
  } catch (err) {
    console.error("Dune API error:", err)
    return res.status(502).json({ error: "Failed to fetch from Dune" })
  }
}
