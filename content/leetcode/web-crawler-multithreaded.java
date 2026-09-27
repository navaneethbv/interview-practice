class Solution {
    public List<String> crawl(String startUrl, HtmlParser htmlParser) {
        String hostname = java.net.URI.create(startUrl).getHost();
        Set<String> seen = new HashSet<>();
        seen.add(startUrl);
        java.util.concurrent.ExecutorService workers =
                java.util.concurrent.Executors.newFixedThreadPool(4);
        try {
            List<String> level = new ArrayList<>();
            level.add(startUrl);
            while (!level.isEmpty()) {
                List<java.util.concurrent.Future<List<String>>> futures =
                        submitLevel(level, htmlParser, workers);
                level = collectNext(futures, hostname, seen);
            }
            return new ArrayList<>(seen);
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Crawl interrupted", exception);
        } catch (java.util.concurrent.ExecutionException exception) {
            throw new IllegalStateException("Page fetch failed", exception.getCause());
        } finally {
            workers.shutdownNow();
        }
    }

    private List<java.util.concurrent.Future<List<String>>> submitLevel(
            List<String> level, HtmlParser htmlParser,
            java.util.concurrent.ExecutorService workers) {
        List<java.util.concurrent.Future<List<String>>> futures = new ArrayList<>();
        for (String url : level) {
            futures.add(workers.submit(() -> htmlParser.getUrls(url)));
        }
        return futures;
    }

    private List<String> collectNext(
            List<java.util.concurrent.Future<List<String>>> futures,
            String hostname, Set<String> seen)
            throws InterruptedException, java.util.concurrent.ExecutionException {
        List<String> next = new ArrayList<>();
        for (java.util.concurrent.Future<List<String>> future : futures) {
            for (String linked : future.get()) {
                if (hostname.equals(java.net.URI.create(linked).getHost()) && seen.add(linked)) {
                    next.add(linked);
                }
            }
        }
        return next;
    }
}
