import type { PulseData } from "./types"

export const mockPulseData: PulseData = {
  timestamp: new Date().toISOString(),
  ecosystemActivity: [
    { label: "Active Wallets", value: "+8.3%", signal: "up", subLabel: "vs 24h ago" },
    { label: "Transactions", value: "+12.1%", signal: "up", subLabel: "vs 24h ago" },
  ],
  defiMovement: [
    { label: "TVL 24h", value: "+3.2%", signal: "up", subLabel: "24h delta" },
    { label: "TVL 7d", value: "-1.4%", signal: "down", subLabel: "7d delta" },
  ],
  protocolTraction: [
    { name: "Jupiter", growth: "+24.5%", signal: "up" },
    { name: "Marinade", growth: "+18.2%", signal: "up" },
  ],
  networkHeat: {
    level: "medium",
    label: "Network Load",
    value: "Moderate activity",
  },
}
