---
title: Solana Pulse Signals
date: 2026-03-14
source: https://solanapulse.live
---

# Solana Pulse — 2026-03-14

Daily health signals for the Solana ecosystem.
Each signal is a directional delta (up/flat/down), not an absolute value.

## Current Signals

| Signal | Direction | State | Context |
|--------|-----------|-------|---------|
| Network Activity | ↓ down | Cooling down | -5.3% vs 7d avg |
| DeFi Momentum | → flat | Flat | +0.8% TVL (24h) |
| User Demand | → flat | Steady | +4.7% tx/wallet delta · 88.1 tx/wallet |
| Attention / Fees | → flat | Normal | -1.8% fee delta (24h) |
| Protocol Highlight | ↑ up | DFDV Staked SOL surging | +25.9% TVL (24h) · $58M |
| Stability | → flat | Stable | 391ms avg slot (400ms target) |

## Data

```jsonc
{
  "date": "2026-03-14",
  "signals": [
    {
      "id": "network-activity",
      "title": "Network Activity",
      "signal": "down",
      "state": "Cooling down",
      "context": "-5.3% vs 7d avg"
    },
    {
      "id": "defi-momentum",
      "title": "DeFi Momentum",
      "signal": "flat",
      "state": "Flat",
      "context": "+0.8% TVL (24h)"
    },
    {
      "id": "user-demand",
      "title": "User Demand",
      "signal": "flat",
      "state": "Steady",
      "context": "+4.7% tx/wallet delta · 88.1 tx/wallet"
    },
    {
      "id": "attention",
      "title": "Attention / Fees",
      "signal": "flat",
      "state": "Normal",
      "context": "-1.8% fee delta (24h)"
    },
    {
      "id": "protocol-highlight",
      "title": "Protocol Highlight",
      "signal": "up",
      "state": "DFDV Staked SOL surging",
      "context": "+25.9% TVL (24h) · $58M"
    },
    {
      "id": "stability",
      "title": "Stability",
      "signal": "flat",
      "state": "Stable",
      "context": "391ms avg slot (400ms target)"
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

Network Activity: Cooling down (-5.3% vs 7d avg). DeFi Momentum: Flat (+0.8% TVL (24h)). User Demand: Steady (+4.7% tx/wallet delta · 88.1 tx/wallet). Attention / Fees: Normal (-1.8% fee delta (24h)). DFDV Staked SOL surging (+25.9% TVL (24h) · $58M). Stability: Stable (391ms avg slot (400ms target)).

## More Info

- Website: https://solanapulse.live
- Docs for AI agents: https://solanapulse.live/llms.txt
