# CLAUDE.md

## Project: Solana Pulse

Daily signal dashboard for the Solana ecosystem — signals, not noise.

## Architecture

Single-page dashboard with an Express API backend. Signal-first, one-glance UX.

### Data Flow

```
React App → fetch("/api/pulse") → Express server (:3001) → Dune SDK → Dune API
```

- **Frontend:** Vite + React 19 + TypeScript + Tailwind v4 + Sora/IBM Plex Mono fonts
- **Backend:** Express server using `@duneanalytics/client-sdk`
- **Dev proxy:** Vite proxies `/api` → `http://localhost:3001`
- **Fallback:** If API is unavailable, frontend shows mock data with amber banner

### Signal Cards (6 total)

Each card shows: **arrow → state phrase → context (small)**

1. **Network Activity** — aggregated wallets + TX delta (real Dune data, ±3% threshold)
2. **DeFi Momentum** — TVL delta 24h (real Dune data, ±2% threshold)
3. **User Demand** — tx per wallet proxy (mock, ±5% threshold)
4. **Attention / Fees** — fee delta (mock, ±5% threshold)
5. **Protocol Highlight** — anomalous growth protocol (mock)
6. **Stability** — congestion/failed tx (mock, only flat/down)

### Key Principle

Never display absolutes alone. Every metric is a **delta** — a change from a previous period. The output is a signal (up/flat/down), not a dashboard full of numbers.

### Data Types

```ts
type SignalDirection = "up" | "down" | "flat"
type SignalCard = { id: string; title: string; signal: SignalDirection; state: string; context?: string }
type PulseSnapshot = { date: string; signals: SignalCard[] }
```

## Dune Analytics

- **Query ID:** 6663338
- **SDK:** `@duneanalytics/client-sdk` with `getLatestResult()`
- **API key:** stored in `.env` as `DUNE_API_KEY` (never sent to browser)
- **Response fields:** `weekly_active_addresses_change`, `weekly_transactions_change`, `daily_tvl_usd_change`, `daily_tvl_usd`

## Visual Design

- **Theme:** Dark (#0a0a0f background), Solana brand colors (#9945FF purple, #14F195 green, #00C2FF cyan)
- **Fonts:** Sora (headings), IBM Plex Mono (data context)
- **Cards:** Glass-morphism with purple tint, staggered entrance animation
- **Layout:** 3×2 grid (desktop), 2×3 (tablet), 1×6 (mobile)
- **Accent:** Solana gradient bar at page top

## Analytics

- **Umami** (privacy-friendly, self-hosted) via `analytics.findparty.online`
- Script tag in `index.html` with `defer` attribute
- Website ID: `4359a9f9-3317-41f2-838c-d74d7e9b8049`

## Conventions

- TypeScript everywhere (frontend + server)
- Keep data fetching (server) and display (React) separate
- Signal output format: `SignalCard` type (see above)
- Minimal dependencies — only add what's necessary

## Commands

```bash
npm install        # install dependencies
npm run dev        # start Vite dev server
npm run dev:server # start Express API server
npm run dev:all    # start both concurrently
npm run build      # type-check + production build
npm run lint       # run ESLint
```
