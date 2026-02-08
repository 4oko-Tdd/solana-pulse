function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export function PulseHeader({ date }: { date: string }) {
  return (
    <header className="space-y-3">
      <div className="flex items-center gap-3">
        <img src="/pulse-logo.svg" alt="Solana Pulse" className="h-8 w-8 rounded-lg" />
        <h1 className="font-[family-name:var(--font-heading)] text-xl font-semibold tracking-tight">
          Solana Pulse
        </h1>
        {/* Live indicator */}
        <div className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14F195] opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#14F195]" />
        </div>
      </div>
      <p className="text-sm text-zinc-500">
        Daily snapshot of Solana ecosystem — signals, not noise
      </p>
      <p className="font-[family-name:var(--font-mono)] text-xs text-zinc-600">
        Updated: {formatDate(date)}
      </p>
    </header>
  )
}
