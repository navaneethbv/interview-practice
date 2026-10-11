## Requirements

- Accept limit and market orders, match buy and sell orders by price-time priority, and publish trades and market data.
- Deterministic, auditable and extremely low latency: microseconds per order on the critical path.

Assume a few thousand symbols and 1 million orders per second at peak across them.

## Order book

For each symbol keep bids (highest price first) and asks (lowest price first).
Each price level holds a FIFO queue of orders.

```text
Asks: 101.20 [o7 300] [o9 100]
      101.10 [o3 200]
Bids: 101.00 [o5 500]
       100.90 [o2 100] [o8 250]
```

A buy limit at 101.15 for 250 matches o3 for 200 at 101.10, then rests the remaining 50 at 101.15 on the bid side.

## Architecture

```text
Gateways -> sequencer (assigns a global sequence number, writes to a journal)
         -> matching engine (single thread per symbol shard, in memory)
         -> trades + book updates -> market data publisher, clearing, risk
```

## Deep dives

**Determinism.** The sequencer gives every input a sequence number and journals it before matching.
The engine is a pure function of the input sequence, so replaying the journal rebuilds the exact state, and a hot standby can consume the same journal.

**Single-threaded matching.** One thread per symbol shard avoids locks and makes ordering trivial; scale by sharding symbols, not by parallelizing one book.

**Data structures.** Price levels in an array indexed by tick for dense books, or a tree map; orders in an intrusive doubly linked list plus a hash map from order id for O(1) cancel.

## Follow-up questions

- How is risk checked without slowing matching? (Pre-trade risk in the gateway with cached limits; the engine only enforces simple invariants.)
- How do you fail over? (Standby replays the journal and takes over at a known sequence number.)
