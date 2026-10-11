Frontend system design asks you to design a client application, for example a news feed, a chat app, a photo editor or an e-commerce checkout.

## Framework for the round

1. **Requirements:** features, devices, offline needs, performance targets.
2. **Architecture:** rendering strategy (client, server, static, streaming), routing, and component boundaries.
3. **Data model and state:** what lives on the server, in a client cache, in component state, and in the URL.
4. **API design:** endpoints or GraphQL queries, pagination, and real-time updates.
5. **Performance:** bundle size, caching, list virtualization, image strategy.
6. **Accessibility and internationalization.**
7. **Reliability and observability:** error boundaries, retries, client-side logging and performance monitoring.

## Worked sketch: a news feed

- Server render the first page for fast LCP, then hydrate.
- Cursor-based pagination with an `IntersectionObserver` to load more.
- A normalized client cache keyed by post id, so a like on one view updates every view of the post.
- Optimistic updates for likes with rollback on failure.
- New posts arrive over server-sent events; show "N new posts" instead of shifting content under the reader.
- Virtualize the list when it grows long; keep scroll position when navigating back.

## Follow-up questions

- How do you keep the app usable offline? (A service worker caching the shell and recent data, with queued writes.)
- How do you ship safely? (Feature flags, gradual rollout, and monitoring of real-user metrics.)
