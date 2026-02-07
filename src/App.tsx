import { useEffect, useState } from "react"
import { Dashboard } from "@/components/dashboard"
import { mockPulseData } from "@/lib/mock-data"
import { fetchPulseData } from "@/lib/api"
import type { PulseSnapshot } from "@/lib/types"
import { Loader2 } from "lucide-react"

function App() {
  const [data, setData] = useState<PulseSnapshot | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPulseData()
      .then(setData)
      .catch((err) => {
        console.warn("API unavailable, using mock data:", err.message)
        setError("Live data unavailable — showing mock data")
        setData(mockPulseData)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="dark min-h-svh bg-[#0a0a0f] text-zinc-50">
      {/* Solana gradient accent bar */}
      <div className="sol-gradient-bar" />

      {loading ? (
        <div className="flex min-h-svh items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-[#9945FF]" />
        </div>
      ) : data ? (
        <>
          {error && (
            <div className="border-b border-amber-500/20 bg-amber-500/5 px-4 py-2 text-center font-[family-name:var(--font-mono)] text-xs text-amber-400/80">
              {error}
            </div>
          )}
          <Dashboard data={data} />
        </>
      ) : null}
    </div>
  )
}

export default App
