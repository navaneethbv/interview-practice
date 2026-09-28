class PopularSongs {
    private final Map<String, Integer> plays = new HashMap<>();
    private final PriorityQueue<Integer> lower = new PriorityQueue<>(Collections.reverseOrder());
    private final PriorityQueue<Integer> upper = new PriorityQueue<>();

    public void registerPlays(String title, int count) {
        plays.put(title, count);
        lower.add(count);
        upper.add(lower.poll());
        if (upper.size() > lower.size()) {
            lower.add(upper.poll());
        }
    }

    public boolean isPopular(String title) {
        long doubledMedian = lower.size() > upper.size() ? 2L * lower.peek() : (long) lower.peek() + upper.peek();
        return 2L * plays.get(title) > doubledMedian;
    }
}
