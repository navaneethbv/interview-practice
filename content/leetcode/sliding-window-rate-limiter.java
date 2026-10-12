class SlidingWindowLimiter {
    private final int limit;
    private final int window;
    private final Map<String, Deque<Integer>> history = new HashMap<>();

    public SlidingWindowLimiter(int limit, int window) {
        this.limit = limit;
        this.window = window;
    }

    public boolean allow(String key, int timestamp) {
        Deque<Integer> requests = history.computeIfAbsent(key, ignored -> new ArrayDeque<>());
        while (!requests.isEmpty() && requests.peekFirst() <= (long) timestamp - window) {
            requests.removeFirst();
        }
        if (requests.size() >= limit) {
            return false;
        }
        requests.addLast(timestamp);
        return true;
    }
}
