import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"

const heatColors = {
  low: "text-zinc-500",
  medium: "text-amber-500",
  high: "text-red-500",
}

export function HeatCard({
  level,
  label,
  value,
}: {
  level: "low" | "medium" | "high"
  label: string
  value: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-zinc-400">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Flame className={`h-8 w-8 ${heatColors[level]}`} />
          <div>
            <p className={`text-lg font-bold capitalize ${heatColors[level]}`}>{level}</p>
            <p className="text-xs text-zinc-500">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
