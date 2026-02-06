import type { PulseData } from "./types"

export async function fetchPulseData(): Promise<PulseData> {
  const res = await fetch("/api/pulse")
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }
  return res.json()
}
