---
title: Solana Pulse Signals
date: 2026-02-13
source: https://solanapulse.live
---

# Solana Pulse — 2026-02-13

Daily health signals for the Solana ecosystem.
Each signal is a directional delta (up/flat/down), not an absolute value.

## Current Signals

| Signal | Direction | State | Context |
|--------|-----------|-------|---------|
| Network Activity | ↑ up | Heating up | +9.5% vs 7d avg |
| DeFi Momentum | ↓ down | Outflow | -9.4% TVL (24h) |
| User Demand | ↑ up | Demand rising | +19.1% tx/wallet delta · 70.1 tx/wallet |
| Attention / Fees | ↓ down | Fees dropping | -8.2% fee delta (24h) |
| Protocol Highlight | ↑ up | DefiTuna AMM surging | +231.2% TVL (24h) · $6M |
| Stability | → flat | Stable | 389ms avg slot (400ms target) |

## Data

```jsonc
{
  "date": "2026-02-13",
  "signals": [
    {
      "id": "network-activity",
      "title": "Network Activity",
      "signal": "up",
      "state": "Heating up",
      "context": "+9.5% vs 7d avg"
    },
    {
      "id": "defi-momentum",
      "title": "DeFi Momentum",
      "signal": "down",
      "state": "Outflow",
      "context": "-9.4% TVL (24h)"
    },
    {
      "id": "user-demand",
      "title": "User Demand",
      "signal": "up",
      "state": "Demand rising",
      "context": "+19.1% tx/wallet delta · 70.1 tx/wallet"
    },
    {
      "id": "attention",
      "title": "Attention / Fees",
      "signal": "down",
      "state": "Fees dropping",
      "context": "-8.2% fee delta (24h)"
    },
    {
      "id": "protocol-highlight",
      "title": "Protocol Highlight",
      "signal": "up",
      "state": "DefiTuna AMM surging",
      "context": "+231.2% TVL (24h) · $6M"
    },
    {
      "id": "stability",
      "title": "Stability",
      "signal": "flat",
      "state": "Stable",
      "context": "389ms avg slot (400ms target)"
    }
  ]
}
```

### Field Descriptions

#### date
Type: `string`
ISO date (YYYY-MM-DD) when signals were generated.

#### signals
Type: `SignalCard[]`
Array of signal card objects.

#### signals[].id
Type: `string`
One of: network-activity, defi-momentum, user-demand, attention, protocol-highlight, stability.

#### signals[].signal
Type: `"up" | "flat" | "down"`
Directional signal based on threshold analysis.

#### signals[].state
Type: `string`
Human-readable state phrase (e.g. "Heating up", "Outflow", "Stable").

#### signals[].context
Type: `string`
Delta context with percentage (e.g. "+5.2% vs 7d avg").

## Summary

Network Activity: Heating up (+9.5% vs 7d avg). DeFi Momentum: Outflow (-9.4% TVL (24h)). User Demand: Demand rising (+19.1% tx/wallet delta · 70.1 tx/wallet). Attention / Fees: Fees dropping (-8.2% fee delta (24h)). DefiTuna AMM surging (+231.2% TVL (24h) · $6M). Stability: Stable (389ms avg slot (400ms target)).

## More Info

- Website: https://solanapulse.live
- Docs for AI agents: https://solanapulse.live/llms.txt
