import type { SignalDirection } from "@/lib/types"

const arrowMap: Record<SignalDirection, { char: string; color: string }> = {
  up: { char: "▲", color: "text-[#14F195]" },
  flat: { char: "▬", color: "text-zinc-600" },
  down: { char: "▼", color: "text-red-400" },
}

type Props = {
  signal: SignalDirection
  title: string
  state: string
  context?: string
}

export function PulseSignalCard({ signal, title, state, context }: Props) {
  const arrow = arrowMap[signal]

  return (
    <div className="signal-card rounded-xl p-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span className={`text-xl leading-none ${arrow.color}`}>
            {arrow.char}
          </span>
          <span className="font-[family-name:var(--font-heading)] text-[13px] font-medium tracking-wide text-zinc-500">
            {title}
          </span>
        </div>
        <p className="font-[family-name:var(--font-heading)] text-[17px] font-medium leading-snug text-zinc-100">
          {state}
        </p>
        {context && (
          <p className="font-[family-name:var(--font-mono)] text-xs text-zinc-600">
            {context}
          </p>
        )}
      </div>
    </div>
  )
}
