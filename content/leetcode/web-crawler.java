class Solution {
    public List<String> crawl(String startUrl, HtmlParser htmlParser) {
        String host = java.net.URI.create(startUrl).getHost();
        Set<String> seen = new HashSet<>();
        Deque<String> pending = new ArrayDeque<>();
        seen.add(startUrl);
        pending.add(startUrl);
        while (!pending.isEmpty()) {
            String current = pending.remove();
            for (String linked : htmlParser.getUrls(current)) {
                String linkedHost = java.net.URI.create(linked).getHost();
                if (host.equals(linkedHost) && seen.add(linked)) {
                    pending.add(linked);
                }
            }
        }
        return new ArrayList<>(seen);
    }
}
