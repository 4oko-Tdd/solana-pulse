import type { PulseSnapshot } from "./types"

export const mockPulseData: PulseSnapshot = {
  date: new Date().toISOString().slice(0, 10),
  signals: [
    {
      id: "network-activity",
      title: "Network Activity",
      signal: "up",
      state: "Heating up",
      context: "+6.2% vs 7d avg",
    },
    {
      id: "defi-momentum",
      title: "DeFi Momentum",
      signal: "up",
      state: "Inflow",
      context: "+3.2% TVL (24h)",
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
  ],
}
