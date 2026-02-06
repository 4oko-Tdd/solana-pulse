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

type Signal = "up" | "down" | "flat"

interface DuneRow {
  blockchain: string
  weekly_transactions: number
  weekly_active_addresses: number
  weekly_transactions_change: string | number
  weekly_active_addresses_change: number
  daily_tvl_usd_change: number
  daily_tvl_usd: number
}

function toSignal(change: number): Signal {
  if (change > 1) return "up"
  if (change < -1) return "down"
  return "flat"
}

function formatDelta(change: number): string {
  const sign = change >= 0 ? "+" : ""
  return `${sign}${change.toFixed(1)}%`
}

function formatTvl(usd: number): string {
  return `$${(usd / 1e9).toFixed(2)}B`
}

function computeHeatLevel(txChange: number, addrChange: number): "low" | "medium" | "high" {
  const avg = (Math.abs(txChange) + Math.abs(addrChange)) / 2
  if (avg > 15) return "high"
  if (avg > 5) return "medium"
  return "low"
}

function transformRow(row: DuneRow) {
  const txChange = Number(row.weekly_transactions_change)
  const addrChange = Number(row.weekly_active_addresses_change)
  const tvlChange = Number(row.daily_tvl_usd_change)
  const heatLevel = computeHeatLevel(txChange, addrChange)

  return {
    timestamp: new Date().toISOString(),
    ecosystemActivity: [
      {
        label: "Active Wallets",
        value: formatDelta(addrChange),
        signal: toSignal(addrChange),
        subLabel: "7d change",
      },
      {
        label: "Transactions",
        value: formatDelta(txChange),
        signal: toSignal(txChange),
        subLabel: "7d change",
      },
    ],
    defiMovement: [
      {
        label: "TVL Change",
        value: formatDelta(tvlChange),
        signal: toSignal(tvlChange),
        subLabel: "24h delta",
      },
      {
        label: "Total TVL",
        value: formatTvl(row.daily_tvl_usd),
        signal: toSignal(tvlChange),
        subLabel: "current",
      },
    ],
    protocolTraction: [
      { name: "Solana Ecosystem", growth: formatDelta(txChange), signal: toSignal(txChange) },
    ],
    networkHeat: {
      level: heatLevel,
      label: "Network Load",
      value: heatLevel === "high"
        ? "Heavy activity"
        : heatLevel === "medium"
          ? "Moderate activity"
          : "Low activity",
    },
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
