import { Dashboard } from "@/components/dashboard"
import { mockPulseData } from "@/lib/mock-data"

function App() {
  return (
    <div className="dark min-h-svh bg-[#0a0a0f] text-zinc-50">
      {/* Solana gradient accent bar */}
      <div className="sol-gradient-bar" />
      <Dashboard data={mockPulseData} />
    </div>
  )
}

export default App
