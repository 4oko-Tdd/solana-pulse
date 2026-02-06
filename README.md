# Solana Pulse

Real-time Solana ecosystem health monitor. Tracks **changes, not absolutes** — delivering concise signals about where the network is heading.

## What It Tracks

### 1. Ecosystem Activity
- Active wallets (24h)
- Transaction count (24h)
- Signal: trending up / flat / down

### 2. DeFi Movement
- TVL change (24h and 7d delta)
- Directional signal, not raw numbers

### 3. Protocol Traction
- Top 1-2 protocols with unusual activity growth
- Surface what's moving, ignore what's static

### 4. Network Heat
- Fees/volume indicator (low / medium / high)
- Spike detection for unusual activity

## Design Principles

- **Deltas over absolutes** — always show direction of change, never raw totals in isolation
- **Signal over noise** — compress complex data into actionable up/flat/down indicators
- **Minimal v0** — start with the smallest useful set of metrics and expand based on real usage

## Tech Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (Card, Badge)
- [Lucide](https://lucide.dev) icons

## Project Structure

```
src/
  components/
    ui/              # shadcn/ui primitives (Card, Badge)
    dashboard.tsx    # 2x2 grid layout composing all cards
    signal-card.tsx  # Reusable metric card with directional arrows
    protocol-card.tsx# Protocol traction with growth badges
    heat-card.tsx    # Network load flame indicator
    pulse-header.tsx # Title + last updated timestamp
  lib/
    types.ts         # Signal, PulseMetric, PulseData type definitions
    mock-data.ts     # Hardcoded realistic Solana metrics (placeholder for real APIs)
    utils.ts         # cn() utility
```

## Getting Started

```bash
git clone https://github.com/4oko-Tdd/solana-pulse.git
cd solana-pulse
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Roadmap

- [ ] Replace mock data with real APIs (DeFi Llama for TVL, Solana RPC for on-chain)
- [ ] Auto-refresh / polling
- [ ] Protocol traction detection logic
- [ ] Historical signal trends

## License

MIT
