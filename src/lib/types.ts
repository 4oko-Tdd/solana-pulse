export type Signal = "up" | "down" | "flat"

export type PulseMetric = {
  label: string
  value: string
  signal: Signal
  subLabel?: string
}

export type ProtocolHighlight = {
  name: string
  growth: string
  signal: Signal
}

export type PulseData = {
  timestamp: string
  ecosystemActivity: PulseMetric[]
  defiMovement: PulseMetric[]
  protocolTraction: ProtocolHighlight[]
  networkHeat: {
    level: "low" | "medium" | "high"
    label: string
    value: string
  }
}
