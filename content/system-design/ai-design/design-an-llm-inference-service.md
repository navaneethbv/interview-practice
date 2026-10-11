## Prompt and requirements

Serve a large language model to many internal applications with streaming responses.
Targets: time to first token under 500 milliseconds at the median, steady tokens per second, and high accelerator utilization to control cost.

## The two phases of generation

**Prefill** processes the whole prompt in parallel and is compute-bound.
**Decode** produces one token at a time per request and is memory-bandwidth-bound, reading the model weights and the KV cache for every step.
Most serving optimizations target decode efficiency.

## Architecture

```text
Clients -> gateway (auth, quotas, routing by model and priority)
        -> scheduler (continuous batching) -> model servers on GPU/TPU replicas
        -> streamed tokens back through the gateway
Shared: prompt-prefix cache, request queue metrics, autoscaler
```

## Key techniques

- **Continuous batching:** add new requests to the running batch at each decode step instead of waiting for a whole batch to finish.
- **Paged KV cache:** allocate attention cache in fixed blocks so memory is not wasted on maximum-length reservations.
- **Prefix caching:** reuse the KV cache for shared prompt prefixes such as system prompts.
- **Quantization and speculative decoding:** reduce memory and per-token latency, verifying quality on your own evaluations.
- **Routing:** send small, latency-sensitive tasks to a smaller model and reserve the large model for hard ones.

## Capacity and reliability

Plan capacity in tokens per second, not requests per second, because prompt and output lengths vary widely.
Apply per-tenant quotas and priority classes so batch jobs cannot starve interactive users.
Time out and cancel abandoned streams to free capacity.

## Follow-up questions

- How do you roll out a new model version? (Shadow traffic, then a canary with quality and latency gates.)
- What do you log? (Token counts, latency per phase, and errors; store prompts only according to the data policy.)
