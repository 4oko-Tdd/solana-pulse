# Solana Pulse MVP Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page dashboard showing Solana ecosystem health signals using mock data, with Vite + React + TypeScript + shadcn/ui.

**Architecture:** Vite React app with 4 signal cards in a responsive grid. Mock data layer exports typed metric objects. Each card displays metric deltas with colored directional indicators (green/gray/red arrows). Dark theme.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v4, shadcn/ui (Card, Badge), Lucide icons

---

### Task 1: Scaffold Vite + React + TypeScript Project

**Files:**
- Create: entire project scaffold via CLI

**Step 1: Create Vite project**

Run:
```bash
cd /Users/trig/Documents/solana-pulse
npm create vite@latest . -- --template react-ts
```

Note: Since we're in an existing directory with files, use `.` as target.

**Step 2: Install dependencies**

Run:
```bash
cd /Users/trig/Documents/solana-pulse
npm install
```

**Step 3: Verify it runs**

Run:
```bash
cd /Users/trig/Documents/solana-pulse
npm run dev -- --port 5173 &
sleep 3
curl -s http://localhost:5173 | head -20
kill %1 2>/dev/null
```
Expected: HTML response with root div

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + TypeScript project"
```

---

### Task 2: Install and Configure shadcn/ui

**Files:**
- Modify: `tsconfig.json`, `tsconfig.app.json`, `vite.config.ts`
- Create: `components.json`, `src/lib/utils.ts`

**Step 1: Install Tailwind CSS v4**

Run:
```bash
cd /Users/trig/Documents/solana-pulse
npm install tailwindcss @tailwindcss/vite
```

**Step 2: Configure Vite for Tailwind**

Update `vite.config.ts`:
```ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

**Step 3: Update tsconfig for path aliases**

In `tsconfig.json`, add:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

In `tsconfig.app.json`, add the same paths config to compilerOptions.

**Step 4: Initialize shadcn**

Run:
```bash
cd /Users/trig/Documents/solana-pulse
npx shadcn@latest init -y --base-color zinc
```

**Step 5: Add Card and Badge components**

Run:
```bash
cd /Users/trig/Documents/solana-pulse
npx shadcn@latest add card badge
```

**Step 6: Verify build works**

Run:
```bash
cd /Users/trig/Documents/solana-pulse
npm run build
```
Expected: Build succeeds with no errors

**Step 7: Commit**

```bash
git add -A
git commit -m "chore: configure Tailwind v4 + shadcn/ui with Card and Badge"
```

---

### Task 3: Define Types and Mock Data

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/mock-data.ts`

**Step 1: Create type definitions**

Create `src/lib/types.ts`:
```ts
export type Signal = "up" | "down" | "flat"

export type PulseMetric = {
  label: string
  value: string
  signal: Signal
  subLabel?: string
}

export type ProtocolHighlight = {
  name: string
  growth: string
  signal: Signal
}

export type PulseData = {
  timestamp: string
  ecosystemActivity: PulseMetric[]
  defiMovement: PulseMetric[]
  protocolTraction: ProtocolHighlight[]
  networkHeat: {
    level: "low" | "medium" | "high"
    label: string
    value: string
  }
}
```

**Step 2: Create mock data**

Create `src/lib/mock-data.ts`:
```ts
import { PulseData } from "./types"

export const mockPulseData: PulseData = {
  timestamp: new Date().toISOString(),
  ecosystemActivity: [
    { label: "Active Wallets", value: "+8.3%", signal: "up", subLabel: "vs 24h ago" },
    { label: "Transactions", value: "+12.1%", signal: "up", subLabel: "vs 24h ago" },
  ],
  defiMovement: [
    { label: "TVL 24h", value: "+3.2%", signal: "up", subLabel: "24h delta" },
    { label: "TVL 7d", value: "-1.4%", signal: "down", subLabel: "7d delta" },
  ],
  protocolTraction: [
    { name: "Jupiter", growth: "+24.5%", signal: "up" },
    { name: "Marinade", growth: "+18.2%", signal: "up" },
  ],
  networkHeat: {
    level: "medium",
    label: "Network Load",
    value: "Moderate activity",
  },
}
```

**Step 3: Commit**

```bash
git add src/lib/types.ts src/lib/mock-data.ts
git commit -m "feat: add signal type definitions and mock data"
```

---

### Task 4: Build Signal Card Component

**Files:**
- Create: `src/components/signal-card.tsx`

**Step 1: Build the reusable SignalCard**

Create `src/components/signal-card.tsx`:
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PulseMetric, Signal } from "@/lib/types"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

function SignalIcon({ signal }: { signal: Signal }) {
  switch (signal) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-emerald-500" />
    case "down":
      return <TrendingDown className="h-4 w-4 text-red-500" />
    case "flat":
      return <Minus className="h-4 w-4 text-zinc-500" />
  }
}

function signalColor(signal: Signal) {
  switch (signal) {
    case "up": return "text-emerald-500"
    case "down": return "text-red-500"
    case "flat": return "text-zinc-500"
  }
}

export function SignalCard({ title, metrics }: { title: string; metrics: PulseMetric[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{m.label}</p>
              {m.subLabel && <p className="text-xs text-zinc-500">{m.subLabel}</p>}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${signalColor(m.signal)}`}>{m.value}</span>
              <SignalIcon signal={m.signal} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/signal-card.tsx
git commit -m "feat: add SignalCard component with directional indicators"
```

---

### Task 5: Build Protocol Card and Heat Card Components

**Files:**
- Create: `src/components/protocol-card.tsx`
- Create: `src/components/heat-card.tsx`

**Step 1: Build ProtocolCard**

Create `src/components/protocol-card.tsx`:
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProtocolHighlight } from "@/lib/types"
import { TrendingUp } from "lucide-react"

export function ProtocolCard({ protocols }: { protocols: ProtocolHighlight[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-zinc-400">Protocol Traction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {protocols.map((p) => (
          <div key={p.name} className="flex items-center justify-between">
            <span className="text-sm font-medium">{p.name}</span>
            <Badge variant="secondary" className="gap-1 text-emerald-500">
              <TrendingUp className="h-3 w-3" />
              {p.growth}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
```

**Step 2: Build HeatCard**

Create `src/components/heat-card.tsx`:
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"

const heatColors = {
  low: "text-zinc-500",
  medium: "text-amber-500",
  high: "text-red-500",
}

export function HeatCard({ level, label, value }: { level: "low" | "medium" | "high"; label: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-zinc-400">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Flame className={`h-8 w-8 ${heatColors[level]}`} />
          <div>
            <p className={`text-lg font-bold capitalize ${heatColors[level]}`}>{level}</p>
            <p className="text-xs text-zinc-500">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/protocol-card.tsx src/components/heat-card.tsx
git commit -m "feat: add ProtocolCard and HeatCard components"
```

---

### Task 6: Build Dashboard Layout and Header

**Files:**
- Create: `src/components/pulse-header.tsx`
- Create: `src/components/dashboard.tsx`

**Step 1: Build PulseHeader**

Create `src/components/pulse-header.tsx`:
```tsx
import { Activity } from "lucide-react"

export function PulseHeader({ timestamp }: { timestamp: string }) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Activity className="h-6 w-6 text-emerald-500" />
        <h1 className="text-xl font-bold">Solana Pulse</h1>
      </div>
      <p className="text-xs text-zinc-500">
        Updated {new Date(timestamp).toLocaleTimeString()}
      </p>
    </header>
  )
}
```

**Step 2: Build Dashboard**

Create `src/components/dashboard.tsx`:
```tsx
import { PulseData } from "@/lib/types"
import { PulseHeader } from "./pulse-header"
import { SignalCard } from "./signal-card"
import { ProtocolCard } from "./protocol-card"
import { HeatCard } from "./heat-card"

export function Dashboard({ data }: { data: PulseData }) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <PulseHeader timestamp={data.timestamp} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SignalCard title="Ecosystem Activity" metrics={data.ecosystemActivity} />
        <SignalCard title="DeFi Movement" metrics={data.defiMovement} />
        <ProtocolCard protocols={data.protocolTraction} />
        <HeatCard
          level={data.networkHeat.level}
          label={data.networkHeat.label}
          value={data.networkHeat.value}
        />
      </div>
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/pulse-header.tsx src/components/dashboard.tsx
git commit -m "feat: add PulseHeader and Dashboard layout"
```

---

### Task 7: Wire Up App.tsx and Apply Dark Theme

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.css` (delete)
- Modify: `src/index.css` (ensure dark theme + tailwind)
- Delete: `src/assets/` (unused Vite assets)

**Step 1: Update App.tsx**

Replace `src/App.tsx` with:
```tsx
import { Dashboard } from "@/components/dashboard"
import { mockPulseData } from "@/lib/mock-data"

function App() {
  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-50">
      <Dashboard data={mockPulseData} />
    </div>
  )
}

export default App
```

**Step 2: Clean up default Vite files**

- Delete `src/App.css`
- Delete `src/assets/react.svg`
- Update `src/index.css` to only contain the tailwind import and dark theme base styles

**Step 3: Verify build + dev server**

Run:
```bash
npm run build
```
Expected: Build succeeds

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: wire up dashboard with mock data and dark theme"
```

---

### Task 8: Final Polish and Push

**Step 1: Run dev server and verify visually**

Run:
```bash
npm run dev
```

Check: 4 cards render in a 2x2 grid on desktop, stack on mobile. Dark background. Green/red/amber colors for signals.

**Step 2: Push to GitHub**

```bash
git push origin master
```
