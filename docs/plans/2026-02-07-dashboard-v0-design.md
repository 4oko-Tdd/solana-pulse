# Dashboard v0 Design

## Overview
Rebuild Solana Pulse as a signal-first dashboard: 6 cards, one-glance UX, daily snapshot.

## Data Model
```ts
type SignalDirection = "up" | "down" | "flat"
type SignalCard = { id: string; title: string; signal: SignalDirection; state: string; context?: string }
type PulseSnapshot = { date: string; signals: SignalCard[] }
```

## Cards
1. **Network Activity** — wallets + tx delta (real Dune data, ±3% threshold)
2. **DeFi Momentum** — TVL delta 24h (real Dune data, ±2% threshold)
3. **User Demand** — tx per wallet proxy (mock, ±5% threshold)
4. **Attention / Fees** — fee delta (mock, ±5% threshold)
5. **Protocol Highlight** — anomalous growth protocol (mock)
6. **Stability** — congestion/failed tx (mock, only flat/down)

## Card Format
```
▲  Title
State phrase
+X.X% vs 7d avg
```

Arrow (▲/▬/▼) is the dominant visual element. State phrase is prominent. Context is small.

## Signal-to-State Mapping
- Network Activity: Heating up / Normal range / Cooling down
- DeFi Momentum: Inflow / Flat / Outflow
- User Demand: Demand rising / Normal / Demand cooling
- Attention/Fees: Attention spike / Normal / Low attention
- Protocol Highlight: "[Protocol] surging" (always up)
- Stability: Stable / Degraded (never up)

## Layout
- Desktop: 3×2 grid
- Tablet: 2×3
- Mobile: 1×6

## Header
- Title: "Solana Pulse"
- Subtitle: "Daily snapshot of Solana ecosystem — signals, not noise"
- Date: "Updated: YYYY-MM-DD"

## File Changes
- Delete: signal-card.tsx, protocol-card.tsx, heat-card.tsx
- Create: pulse-signal-card.tsx
- Modify: types.ts, mock-data.ts, api.ts, pulse-header.tsx, dashboard.tsx, App.tsx, server/index.ts
