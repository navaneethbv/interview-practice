## From HTML to pixels

1. Parse HTML into the DOM and CSS into the CSSOM.
2. Combine them into a render tree of visible elements.
3. **Layout** computes sizes and positions.
4. **Paint** fills pixels into layers.
5. **Composite** assembles layers on the GPU.

Changing geometry (width, top) triggers layout; changing color triggers paint; changing `transform` or `opacity` can often be composited alone, which is why animations prefer them.
Reading a layout property such as `offsetHeight` right after writing styles forces a synchronous layout; batch reads before writes.

## Core Web Vitals

- **LCP (Largest Contentful Paint):** loading speed of the main content; target under 2.5 seconds.
- **INP (Interaction to Next Paint):** responsiveness to input; target under 200 milliseconds.
- **CLS (Cumulative Layout Shift):** visual stability; target under 0.1.

## Practical optimizations

- Ship less JavaScript: code splitting, tree shaking, and lazy loading routes and heavy components.
- Serve responsive, modern image formats with explicit dimensions to avoid layout shift.
- Cache static assets with long-lived hashed filenames and use a CDN.
- Virtualize long lists so only visible rows exist in the DOM.
- Render on the server or at build time for content pages to improve first paint.
