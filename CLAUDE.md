# CLAUDE.md

## Project: Solana Pulse

Real-time Solana ecosystem health monitor focused on change signals.

## Architecture

Single-page dashboard with an Express API backend.

### Data Flow

```
React App → fetch("/api/pulse") → Express server (:3001) → Dune SDK → Dune API
```

- **Frontend:** Vite + React 19 + TypeScript + Tailwind v4 + shadcn/ui
- **Backend:** Express server using `@duneanalytics/client-sdk`
- **Dev proxy:** Vite proxies `/api` → `http://localhost:3001`
- **Fallback:** If API is unavailable, frontend shows mock data with amber banner

### Core Data Domains

1. **Ecosystem Activity** — active wallets, TX count (7d change) → directional signal (up/flat/down)
2. **DeFi Movement** — TVL delta (24h) → directional signal
3. **Protocol Traction** — surface protocols with unusual growth spikes
4. **Network Heat** — combined TX + wallet change rate → low/medium/high

### Key Principle

Never display absolutes alone. Every metric is a **delta** — a change from a previous period. The output is a signal (up/flat/down), not a dashboard full of numbers.

## Dune Analytics

- **Query ID:** 6663338
- **SDK:** `@duneanalytics/client-sdk` with `getLatestResult()`
- **API key:** stored in `.env` as `DUNE_API_KEY` (never sent to browser)
- **Response fields:** `weekly_active_addresses_change`, `weekly_transactions_change`, `daily_tvl_usd_change`, `daily_tvl_usd`

## Conventions

- TypeScript everywhere (frontend + server)
- Keep data fetching (server) and display (React) separate
- Signal output format: `{ label: string, value: string, signal: "up" | "flat" | "down" }`
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
