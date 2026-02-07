import type { PulseSnapshot } from "@/lib/types"
import { PulseHeader } from "./pulse-header"
import { PulseSignalCard } from "./pulse-signal-card"

export function Dashboard({ data }: { data: PulseSnapshot }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <PulseHeader date={data.date} />

      {/* Micro-legend */}
      <div className="mt-6 flex items-center gap-4 font-[family-name:var(--font-mono)] text-[11px] text-zinc-600">
        <span>
          <span className="text-[#14F195]">▲</span> up
        </span>
        <span>
          <span className="text-zinc-600">▬</span> normal
        </span>
        <span>
          <span className="text-red-400">▼</span> down
        </span>
        <span className="text-zinc-700">|</span>
        <span className="text-zinc-600">Signals compare today vs 7-day average</span>
      </div>

      {/* Signal cards grid */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Footer */}
      <footer className="mt-16 border-t border-white/5 pt-6 pb-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-zinc-600">
            An experimental Solana signal project
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-zinc-700">
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
