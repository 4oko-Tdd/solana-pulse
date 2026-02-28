---
title: Solana Pulse Signals
date: 2026-02-28
source: https://solanapulse.live
---

# Solana Pulse — 2026-02-28

Daily health signals for the Solana ecosystem.
Each signal is a directional delta (up/flat/down), not an absolute value.

## Current Signals

| Signal | Direction | State | Context |
|--------|-----------|-------|---------|
| Network Activity | ↓ down | Cooling down | -7.4% vs 7d avg |
| DeFi Momentum | ↓ down | Outflow | -4.0% TVL (24h) |
| User Demand | ↑ up | Demand rising | +13.2% tx/wallet delta · 77.0 tx/wallet |
| Attention / Fees | → flat | Normal | +3.6% fee delta (24h) |
| Protocol Highlight | ↑ up | DefiTuna AMM surging | +5.2% TVL (24h) · $8M |
| Stability | → flat | Stable | 394ms avg slot (400ms target) |

## Data

```jsonc
{
  "date": "2026-02-28",
  "signals": [
    {
      "id": "network-activity",
      "title": "Network Activity",
      "signal": "down",
      "state": "Cooling down",
      "context": "-7.4% vs 7d avg"
    },
    {
      "id": "defi-momentum",
      "title": "DeFi Momentum",
      "signal": "down",
      "state": "Outflow",
      "context": "-4.0% TVL (24h)"
    },
    {
      "id": "user-demand",
      "title": "User Demand",
      "signal": "up",
      "state": "Demand rising",
      "context": "+13.2% tx/wallet delta · 77.0 tx/wallet"
    },
    {
      "id": "attention",
      "title": "Attention / Fees",
      "signal": "flat",
      "state": "Normal",
      "context": "+3.6% fee delta (24h)"
    },
    {
      "id": "protocol-highlight",
      "title": "Protocol Highlight",
      "signal": "up",
      "state": "DefiTuna AMM surging",
      "context": "+5.2% TVL (24h) · $8M"
    },
    {
      "id": "stability",
      "title": "Stability",
      "signal": "flat",
      "state": "Stable",
      "context": "394ms avg slot (400ms target)"
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

Network Activity: Cooling down (-7.4% vs 7d avg). DeFi Momentum: Outflow (-4.0% TVL (24h)). User Demand: Demand rising (+13.2% tx/wallet delta · 77.0 tx/wallet). Attention / Fees: Normal (+3.6% fee delta (24h)). DefiTuna AMM surging (+5.2% TVL (24h) · $8M). Stability: Stable (394ms avg slot (400ms target)).

## More Info

- Website: https://solanapulse.live
- Docs for AI agents: https://solanapulse.live/llms.txt
