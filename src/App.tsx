import { Dashboard } from "@/components/dashboard"
import { mockPulseData } from "@/lib/mock-data"

function App() {
  return (
    <div className="dark min-h-svh bg-zinc-950 text-zinc-50">
      <Dashboard data={mockPulseData} />
    </div>
  )
}

export default App
