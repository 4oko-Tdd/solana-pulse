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
    <div className="signal-card rounded-lg p-3 sm:rounded-xl sm:p-5">
      <div className="flex flex-col gap-1.5 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <span className={`text-base leading-none sm:text-xl ${arrow.color}`}>
            {arrow.char}
          </span>
          <span className="font-[family-name:var(--font-heading)] text-[11px] font-medium tracking-wide text-zinc-500 sm:text-[13px]">
            {title}
          </span>
        </div>
        <p className="font-[family-name:var(--font-heading)] text-[14px] font-medium leading-snug text-zinc-100 sm:text-[17px]">
          {state}
        </p>
        {context && (
          <p className="font-[family-name:var(--font-mono)] text-[10px] leading-tight text-zinc-600 sm:text-xs">
            {context}
          </p>
        )}
      </div>
    </div>
  )
}
