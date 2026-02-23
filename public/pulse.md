---
title: Solana Pulse Signals
date: 2026-02-23
source: https://solanapulse.live
---

# Solana Pulse — 2026-02-23

Daily health signals for the Solana ecosystem.
Each signal is a directional delta (up/flat/down), not an absolute value.

## Current Signals

| Signal | Direction | State | Context |
|--------|-----------|-------|---------|
| Network Activity | ↓ down | Cooling down | -18.4% vs 7d avg |
| DeFi Momentum | → flat | Flat | +1.3% TVL (24h) |
| User Demand | → flat | Steady | -2.6% tx/wallet delta · 66.8 tx/wallet |
| Attention / Fees | → flat | Normal | +2.0% fee delta (24h) |
| Protocol Highlight | ↑ up | Synatra surging | +80.8% TVL (24h) · $6M |
| Stability | → flat | Stable | RPC unavailable |

## Data

```jsonc
{
  "date": "2026-02-23",
  "signals": [
    {
      "id": "network-activity",
      "title": "Network Activity",
      "signal": "down",
      "state": "Cooling down",
      "context": "-18.4% vs 7d avg"
    },
    {
      "id": "defi-momentum",
      "title": "DeFi Momentum",
      "signal": "flat",
      "state": "Flat",
      "context": "+1.3% TVL (24h)"
    },
    {
      "id": "user-demand",
      "title": "User Demand",
      "signal": "flat",
      "state": "Steady",
      "context": "-2.6% tx/wallet delta · 66.8 tx/wallet"
    },
    {
      "id": "attention",
      "title": "Attention / Fees",
      "signal": "flat",
      "state": "Normal",
      "context": "+2.0% fee delta (24h)"
    },
    {
      "id": "protocol-highlight",
      "title": "Protocol Highlight",
      "signal": "up",
      "state": "Synatra surging",
      "context": "+80.8% TVL (24h) · $6M"
    },
    {
      "id": "stability",
      "title": "Stability",
      "signal": "flat",
      "state": "Stable",
      "context": "RPC unavailable"
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

Network Activity: Cooling down (-18.4% vs 7d avg). DeFi Momentum: Flat (+1.3% TVL (24h)). User Demand: Steady (-2.6% tx/wallet delta · 66.8 tx/wallet). Attention / Fees: Normal (+2.0% fee delta (24h)). Synatra surging (+80.8% TVL (24h) · $6M). Stability: Stable (RPC unavailable).

## More Info

- Website: https://solanapulse.live
- Docs for AI agents: https://solanapulse.live/llms.txt
