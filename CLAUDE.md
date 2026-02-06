# CLAUDE.md

## Project: Solana Pulse

Real-time Solana ecosystem health monitor focused on change signals.

## Architecture

This is a v0 — minimal viable signal dashboard for the Solana network.

### Core Data Domains

1. **Ecosystem Activity** — active wallets (24h), TX count (24h) → directional signal (up/flat/down)
2. **DeFi Movement** — TVL delta (24h, 7d) → directional signal only, no absolute values
3. **Protocol Traction** — surface 1-2 protocols with unusual growth spikes
4. **Fees / Volume** — optional heat indicator for network load

### Key Principle

Never display absolutes alone. Every metric is a **delta** — a change from a previous period. The output is a signal (up/flat/down), not a dashboard full of numbers.

## Conventions

- TypeScript preferred
- Keep data fetching and signal computation separate
- Signal output format: `{ metric: string, signal: "up" | "flat" | "down", delta: number }`
- Minimal dependencies — only add what's necessary

## Data Sources (planned)

- Solana RPC for on-chain metrics
- DeFi Llama API for TVL data
- Protocol-specific APIs as needed

## Commands

```bash
npm install    # install dependencies
npm start      # run the application
npm test       # run tests
npm run build  # build for production
```
