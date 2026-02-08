function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export function PulseHeader({ date }: { date: string }) {
  return (
    <header className="space-y-2 sm:space-y-3">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <img src="/pulse-logo.svg" alt="Solana Pulse" className="h-7 w-7 rounded-lg sm:h-8 sm:w-8" />
        <h1 className="font-[family-name:var(--font-heading)] text-lg font-semibold tracking-tight sm:text-xl">
          Solana Pulse
        </h1>
        {/* Live indicator */}
        <div className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14F195] opacity-40" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#14F195] sm:h-2 sm:w-2" />
        </div>
      </div>
      <p className="text-xs text-zinc-500 sm:text-sm">
        Daily snapshot of Solana ecosystem — signals, not noise
      </p>
      <p className="font-[family-name:var(--font-mono)] text-[10px] text-zinc-600 sm:text-xs">
        Updated: {formatDate(date)}
      </p>
    </header>
  )
}
