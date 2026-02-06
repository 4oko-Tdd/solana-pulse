import { Activity } from "lucide-react"

export function PulseHeader({ timestamp }: { timestamp: string }) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Activity className="h-6 w-6 text-emerald-500" />
        <h1 className="text-xl font-bold">Solana Pulse</h1>
      </div>
      <p className="text-xs text-zinc-500">
        Updated {new Date(timestamp).toLocaleTimeString()}
      </p>
    </header>
  )
}
