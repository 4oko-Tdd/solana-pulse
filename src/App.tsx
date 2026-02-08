import { Dashboard } from "@/components/dashboard"
import pulseData from "@/lib/pulse-data.json"
import type { PulseSnapshot } from "@/lib/types"

function App() {
  return (
    <div className="dark min-h-svh bg-[#0a0a0f] text-zinc-50">
      {/* Solana gradient accent bar */}
      <div className="sol-gradient-bar" />
      <Dashboard data={pulseData as PulseSnapshot} />
    </div>
  )
}

export default App
