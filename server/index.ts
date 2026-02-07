import express from "express"
import cors from "cors"
import { DuneClient } from "@duneanalytics/client-sdk"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

const DUNE_API_KEY = process.env.DUNE_API_KEY
if (!DUNE_API_KEY) {
  console.error("DUNE_API_KEY is required. Add it to .env file.")
  process.exit(1)
}

const dune = new DuneClient(DUNE_API_KEY)
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
  "user-demand": { up: "Demand rising", flat: "Normal", down: "Demand cooling" },
  "attention": { up: "Attention spike", flat: "Normal", down: "Low attention" },
  "stability": { up: "Stable", flat: "Stable", down: "Degraded" },
}

function transformRow(row: DuneRow) {
  const txChange = Number(row.weekly_transactions_change)
  const addrChange = Number(row.weekly_active_addresses_change)
  const tvlChange = Number(row.daily_tvl_usd_change)

  // Aggregate network activity: average of tx + wallet change
  const networkDelta = (txChange + addrChange) / 2
  const networkSignal = toSignal(networkDelta, 3)

  const defiSignal = toSignal(tvlChange, 2)

  const signals: SignalCard[] = [
    // Card 1: Network Activity (real data)
    {
      id: "network-activity",
      title: "Network Activity",
      signal: networkSignal,
      state: stateMap["network-activity"][networkSignal],
      context: `${formatDelta(networkDelta)} vs 7d avg`,
    },
    // Card 2: DeFi Momentum (real data)
    {
      id: "defi-momentum",
      title: "DeFi Momentum",
      signal: defiSignal,
      state: stateMap["defi-momentum"][defiSignal],
      context: `${formatDelta(tvlChange)} TVL (24h)`,
    },
    // Card 3: User Demand (mock — no fee data yet)
    {
      id: "user-demand",
      title: "User Demand",
      signal: "up",
      state: "Demand rising",
      context: "+4.8% vs 7d avg",
    },
    // Card 4: Attention / Fees (mock — no fee data yet)
    {
      id: "attention",
      title: "Attention / Fees",
      signal: "flat",
      state: "Normal",
      context: "~0% fee delta",
    },
    // Card 5: Protocol Highlight (mock — no per-protocol data yet)
    {
      id: "protocol-highlight",
      title: "Protocol Highlight",
      signal: "up",
      state: "Jupiter surging",
      context: "+18% users (24h)",
    },
    // Card 6: Stability (mock — no congestion data yet)
    {
      id: "stability",
      title: "Stability",
      signal: "flat",
      state: "Stable",
      context: "No congestion detected",
    },
  ]

  return {
    date: new Date().toISOString().slice(0, 10),
    signals,
  }
}

app.use(cors())

app.get("/api/pulse", async (_req, res) => {
  try {
    const result = await dune.getLatestResult({ queryId: QUERY_ID })

    const rows = result.result?.rows as DuneRow[] | undefined
    if (!rows || rows.length === 0) {
      res.status(502).json({ error: "No data from Dune" })
      return
    }

    const pulseData = transformRow(rows[0])
    res.json(pulseData)
  } catch (err) {
    console.error("Dune API error:", err)
    res.status(502).json({ error: "Failed to fetch from Dune" })
  }
})

app.listen(port, () => {
  console.log(`Solana Pulse API running on http://localhost:${port}`)
})
