import { useEffect, useState } from "react"
import { Dashboard } from "@/components/dashboard"
import { mockPulseData } from "@/lib/mock-data"
import { fetchPulseData } from "@/lib/api"
import type { PulseData } from "@/lib/types"
import { Loader2 } from "lucide-react"

function App() {
  const [data, setData] = useState<PulseData | null>(null)
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
    <div className="dark min-h-svh bg-zinc-950 text-zinc-50">
      {loading ? (
        <div className="flex min-h-svh items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        </div>
      ) : data ? (
        <>
          {error && (
            <div className="border-b border-amber-500/20 bg-amber-500/10 px-4 py-2 text-center text-xs text-amber-400">
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
