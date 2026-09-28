class ViewerCounter {
    private final int window;
    private final Map<String, Deque<Integer>> joins = new HashMap<>();

    public ViewerCounter(int window) {
        this.window = window;
    }

    public void join(int t, String v) {
        joins.computeIfAbsent(v, key -> new ArrayDeque<>()).addLast(t);
    }

    public int getViewers(int t, String v) {
        Deque<Integer> times = joins.computeIfAbsent(v, key -> new ArrayDeque<>());
        while (!times.isEmpty() && times.peekFirst() < t - window) {
            times.pollFirst();
        }
        return times.size();
    }
}
