# Solana Pulse

Daily signal dashboard for the Solana ecosystem. **Signals, not noise** — one glance to know what's happening today.

## What It Shows

6 signal cards, each answering one question:

| Card | Question | Data Source |
|------|----------|-------------|
| **Network Activity** | Is the network heating up? | Dune (wallets + TX 7d change) |
| **DeFi Momentum** | Are funds flowing in? | Dune (TVL 24h delta) |
| **User Demand** | Is usage intensifying? | Mock (v0) |
| **Attention / Fees** | Is there speculative interest? | Mock (v0) |
| **Protocol Highlight** | Any protocol surging? | Mock (v0) |
| **Stability** | Is the network healthy? | Mock (v0) |

Each card shows: **▲/▬/▼ arrow → state phrase → small context**

## Design Principles

- **Signal-first** — arrow → state → number (small). Not the other way around.
- **Deltas over absolutes** — every metric is a change vs 7-day average
- **One-glance UX** — understand "what's up with Solana today" in 5 seconds
- **Daily snapshot** — not real-time, not analytics. One snapshot per day.

## Tech Stack

**Frontend:**
- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- Sora + IBM Plex Mono fonts
- Solana brand colors (#9945FF, #14F195, #00C2FF)

**Backend:**
- [Express](https://expressjs.com) API server
- [Dune Analytics SDK](https://docs.dune.com) — query 6663338

## Project Structure

```
server/
  index.ts               # Express server — GET /api/pulse, Dune SDK + signal logic
src/
  components/
    ui/                  # shadcn/ui primitives (Card, Badge)
    dashboard.tsx        # 3×2 grid layout + micro-legend + footer
    pulse-signal-card.tsx # Reusable signal card (arrow + state + context)
    pulse-header.tsx     # Title + subtitle + date
  lib/
    api.ts               # Frontend fetch client
    types.ts             # SignalDirection, SignalCard, PulseSnapshot
    mock-data.ts         # Fallback data (6 cards)
    utils.ts             # cn() utility
docs/
  plans/                 # Design documents
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
npm run dev:all
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
| `npm run lint` | Run ESLint |

## Data Flow

```
Browser (React) → fetch("/api/pulse") → Express (:3001) → Dune SDK → Dune API
                                              ↓
                                     Transform to PulseSnapshot
                                     (2 real + 4 mock signals)
                                              ↓
                                     JSON response → 6 signal cards
```

## Roadmap

- [x] Signal card dashboard (6 cards, v0 format)
- [x] Dune Analytics integration (Network Activity + DeFi Momentum)
- [x] Solana-branded design (gradient, glass cards, Sora font)
- [ ] Wire real data for User Demand, Attention/Fees
- [ ] Protocol traction detection (DeFiLlama)
- [ ] Stability/congestion signal (Solana RPC)
- [ ] Auto-refresh / daily cron

## License

MIT
