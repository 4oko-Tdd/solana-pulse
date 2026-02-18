# Solana Pulse

> Daily signal dashboard for the Solana ecosystem — signals, not noise.

**[Live Demo →](https://solanapulse.live)**

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?logo=tailwindcss&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white&style=flat-square)

One glance to know what's happening with Solana today. Six signal cards, each answering one question with a direction (↑ / → / ↓), a state phrase, and a delta for context.

## Signal Cards

| Card | Question | Data |
|------|----------|------|
| **Network Activity** | Is the network heating up? | Dune Analytics (wallets + TX 7d change) |
| **DeFi Momentum** | Are funds flowing in? | Dune Analytics (TVL 24h delta) |
| **User Demand** | Is usage intensifying? | TX-per-wallet growth proxy |
| **Attention / Fees** | Is there speculative interest? | Fee delta vs previous day |
| **Protocol Highlight** | Any protocol surging? | Top 1d TVL change |
| **Stability** | Is the network healthy? | Slot time drift from 400ms target |

Each card format: **arrow → state phrase → delta context**

## Design Principles

- **Signal-first** — direction before numbers
- **Deltas over absolutes** — every metric is a change from a prior period
- **One-glance UX** — understand the ecosystem in 5 seconds
- **Daily snapshot** — not real-time feeds, not analytics dashboards

## Tech Stack

**Frontend** — Vite · React 19 · TypeScript · Tailwind CSS v4 · Sora + IBM Plex Mono fonts

**Backend** — Express API server · [Dune Analytics SDK](https://docs.dune.com) · Vercel Serverless

**Design** — Dark theme (#0a0a0f) · Solana brand colors (#9945FF, #14F195, #00C2FF) · Glass-morphism cards

## Project Structure

```
src/
  components/
    dashboard.tsx          # 3×2 grid layout
    pulse-signal-card.tsx  # Signal card (arrow + state + context)
    pulse-header.tsx       # Title + date
  lib/
    api.ts                 # Frontend fetch client
    types.ts               # SignalDirection, SignalCard, PulseSnapshot
server/
  index.ts                 # Express server — GET /api/pulse + Dune SDK logic
api/
  pulse.ts                 # Vercel serverless handler (same logic, edge-ready)
public/
  llms.txt                 # Machine-readable API docs for AI agents
  pulse.md                 # Live signal snapshot as Markdown
```

## Getting Started

```bash
git clone https://github.com/4oko-Tdd/solana-pulse.git
cd solana-pulse
npm install
```

### With live Dune data

```bash
cp .env.example .env
# Add your DUNE_API_KEY to .env

npm run dev:all   # starts both Vite + Express
```

### Without an API key (mock data)

```bash
npm run dev
```

The dashboard shows the last cached snapshot with an amber "Live data unavailable" banner.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run dev:server` | Start Express API server |
| `npm run dev:all` | Start both servers concurrently |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run ESLint |

## Data Flow

```
Browser → fetch("/api/pulse") → Express (:3001) → Dune SDK → Dune API
                                      ↓
                               Transform to PulseSnapshot
                               (2 live + 4 derived signals)
                                      ↓
                               JSON → 6 signal cards
```

## Roadmap

- [x] 6-card signal dashboard
- [x] Dune Analytics integration (Network Activity + DeFi Momentum)
- [x] Solana-branded design with glass-morphism cards
- [x] Vercel serverless deployment
- [x] AI agent endpoint (`/llms.txt`, `/pulse.md`)
- [ ] Live data for User Demand, Fees, Stability (Solana RPC + DeFiLlama)
- [ ] Daily cron refresh

## License

MIT
