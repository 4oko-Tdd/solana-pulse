import type { PulseSnapshot } from "@/lib/types"
import { PulseHeader } from "./pulse-header"
import { PulseSignalCard } from "./pulse-signal-card"

export function Dashboard({ data }: { data: PulseSnapshot }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-3 py-5 sm:px-6 sm:py-10">
      <PulseHeader date={data.date} />

      {/* Micro-legend */}
      <div className="mt-4 flex items-center gap-3 font-[family-name:var(--font-mono)] text-[10px] text-zinc-600 sm:mt-6 sm:gap-4 sm:text-[11px]">
        <span>
          <span className="text-[#14F195]">▲</span> up
        </span>
        <span>
          <span className="text-zinc-600">▬</span> normal
        </span>
        <span>
          <span className="text-red-400">▼</span> down
        </span>
        <span className="hidden text-zinc-700 sm:inline">|</span>
        <span className="hidden text-zinc-600 sm:inline">Signals compare today vs 7-day average</span>
      </div>

      {/* Signal cards grid — 2 cols on mobile, 2 on tablet, 3 on desktop */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3 lg:grid-cols-3">
        {data.signals.map((card) => (
          <PulseSignalCard
            key={card.id}
            signal={card.signal}
            title={card.title}
            state={card.state}
            context={card.context}
          />
        ))}
      </div>

      {/* Footer — pushed to bottom */}
      <footer className="mt-auto border-t border-white/5 pt-4 pb-6 sm:pt-6 sm:pb-8">
        <div className="flex flex-col items-center gap-1.5 text-center sm:gap-2">
          <p className="text-[10px] text-zinc-600 sm:text-xs">
            An experimental Solana signal project
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-zinc-700 sm:text-[11px]">
            Built by{" "}
            <a
              href="https://x.com/4oko4ow"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-[#9945FF]"
            >
              @4oko4ow
            </a>
            {" "}and{" "}
            <a
              href="https://x.com/TddSol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-[#9945FF]"
            >
              @TddSol
            </a>
            {" "}&middot; exploring Solana
          </p>
        </div>
      </footer>
    </div>
  )
}
