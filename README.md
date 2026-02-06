# Solana Pulse

Real-time Solana ecosystem health monitor. Tracks **changes, not absolutes** — delivering concise signals about where the network is heading.

## What It Tracks

### 1. Ecosystem Activity
- Active wallets (7d change)
- Transaction count (7d change)
- Signal: trending up / flat / down

### 2. DeFi Movement
- TVL change (24h delta)
- Total TVL with directional signal
- Directional signal, not raw numbers

### 3. Protocol Traction
- Top protocols with unusual activity growth
- Surface what's moving, ignore what's static

### 4. Network Heat
- Combined TX + wallet activity indicator (low / medium / high)
- Derived from rate of change, not absolutes

## Design Principles

- **Deltas over absolutes** — always show direction of change, never raw totals in isolation
- **Signal over noise** — compress complex data into actionable up/flat/down indicators
- **Minimal v0** — start with the smallest useful set of metrics and expand based on real usage

## Tech Stack

**Frontend:**
- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (Card, Badge)
- [Lucide](https://lucide.dev) icons

**Backend:**
- [Express](https://expressjs.com) API server
- [Dune Analytics SDK](https://docs.dune.com) — query 6663338 for Solana ecosystem metrics
- Vite dev proxy forwards `/api` → Express in development

## Project Structure

```
server/
  index.ts             # Express server — GET /api/pulse, Dune SDK integration
  tsconfig.json        # Server-specific TypeScript config
src/
  components/
    ui/                # shadcn/ui primitives (Card, Badge)
    dashboard.tsx      # 2x2 grid layout composing all cards
    signal-card.tsx    # Reusable metric card with directional arrows
    protocol-card.tsx  # Protocol traction with growth badges
    heat-card.tsx      # Network load flame indicator
    pulse-header.tsx   # Title + last updated timestamp
  lib/
    api.ts             # Frontend fetch client — calls /api/pulse
    types.ts           # Signal, PulseMetric, PulseData type definitions
    mock-data.ts       # Fallback data when API is unavailable
    utils.ts           # cn() utility
```

## Getting Started

```bash
git clone https://github.com/4oko-Tdd/solana-pulse.git
cd solana-pulse
npm install
```

### With live data (requires Dune API key)

```bash
# Create .env with your key
cp .env.example .env
# Edit .env and add your DUNE_API_KEY

# Start both servers
npm run dev:server   # terminal 1 — Express on :3001
npm run dev          # terminal 2 — Vite on :5173
```

### Without API key (mock data)

```bash
npm run dev
```

The dashboard will show mock data with an amber "Live data unavailable" banner.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run dev:server` | Start Express API server |
| `npm run dev:all` | Start both servers concurrently |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Data Flow

```
Browser (React) → fetch("/api/pulse") → Express (:3001) → Dune SDK → Dune API (query 6663338)
                                              ↓
                                     Transform to PulseData
                                              ↓
                                     JSON response → Dashboard renders signals
```

## Dune Query Response → PulseData Mapping

| Dune Field | Dashboard Metric |
|---|---|
| `weekly_active_addresses_change` | Ecosystem Activity → Active Wallets |
| `weekly_transactions_change` | Ecosystem Activity → Transactions |
| `daily_tvl_usd_change` | DeFi Movement → TVL Change |
| `daily_tvl_usd` | DeFi Movement → Total TVL |

## Roadmap

- [x] Mock data dashboard with signal cards
- [x] Dune Analytics API integration (Express backend)
- [ ] Auto-refresh / polling
- [ ] Protocol traction detection logic
- [ ] Historical signal trends

## License

MIT
