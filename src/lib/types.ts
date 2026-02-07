export type SignalDirection = "up" | "down" | "flat"

export type SignalCard = {
  id: string
  title: string
  signal: SignalDirection
  state: string
  context?: string
}

export type PulseSnapshot = {
  date: string
  signals: SignalCard[]
}
