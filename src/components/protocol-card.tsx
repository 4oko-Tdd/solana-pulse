import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ProtocolHighlight } from "@/lib/types"
import { TrendingUp } from "lucide-react"

export function ProtocolCard({ protocols }: { protocols: ProtocolHighlight[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-zinc-400">
          Protocol Traction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {protocols.map((p) => (
          <div key={p.name} className="flex items-center justify-between">
            <span className="text-sm font-medium">{p.name}</span>
            <Badge variant="secondary" className="gap-1 text-emerald-500">
              <TrendingUp className="h-3 w-3" />
              {p.growth}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
