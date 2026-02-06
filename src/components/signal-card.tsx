import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PulseMetric, Signal } from "@/lib/types"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

function SignalIcon({ signal }: { signal: Signal }) {
  switch (signal) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-emerald-500" />
    case "down":
      return <TrendingDown className="h-4 w-4 text-red-500" />
    case "flat":
      return <Minus className="h-4 w-4 text-zinc-500" />
  }
}

function signalColor(signal: Signal) {
  switch (signal) {
    case "up":
      return "text-emerald-500"
    case "down":
      return "text-red-500"
    case "flat":
      return "text-zinc-500"
  }
}

export function SignalCard({ title, metrics }: { title: string; metrics: PulseMetric[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{m.label}</p>
              {m.subLabel && <p className="text-xs text-zinc-500">{m.subLabel}</p>}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${signalColor(m.signal)}`}>
                {m.value}
              </span>
              <SignalIcon signal={m.signal} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
