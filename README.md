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

### 4. Fees & Volume (optional)
- Network "heat" indicator
- Spike detection for unusual activity

## Design Principles

- **Deltas over absolutes** — always show direction of change, never raw totals in isolation
- **Signal over noise** — compress complex data into actionable up/flat/down indicators
- **Minimal v0** — start with the smallest useful set of metrics and expand based on real usage

## Getting Started

```bash
# Clone
git clone https://github.com/4oko-Tdd/solana-pulse.git
cd solana-pulse

# Install dependencies
npm install

# Run
npm start
```

## License

MIT
