import type { PulseData } from "@/lib/types"
import { PulseHeader } from "./pulse-header"
import { SignalCard } from "./signal-card"
import { ProtocolCard } from "./protocol-card"
import { HeatCard } from "./heat-card"

export function Dashboard({ data }: { data: PulseData }) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <PulseHeader timestamp={data.timestamp} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SignalCard title="Ecosystem Activity" metrics={data.ecosystemActivity} />
        <SignalCard title="DeFi Movement" metrics={data.defiMovement} />
        <ProtocolCard protocols={data.protocolTraction} />
        <HeatCard
          level={data.networkHeat.level}
          label={data.networkHeat.label}
          value={data.networkHeat.value}
        />
      </div>
      <p className="pt-8 text-center text-zinc-500">Ogrik · Flip Journal Community Russia</p>
    </div>
  )
}
