class FirstUnique {
    private final Map<Integer, Integer> counts = new HashMap<>();
    private final ArrayDeque<Integer> queue = new ArrayDeque<>();

    public FirstUnique(int[] nums) {
        for (int value : nums) {
            add(value);
        }
    }

    public int showFirstUnique() {
        discardRepeatedPrefix();
        return queue.isEmpty() ? -1 : queue.peek();
    }

    public void add(int value) {
        counts.merge(value, 1, Integer::sum);
        queue.add(value);
    }

    private void discardRepeatedPrefix() {
        while (!queue.isEmpty() && counts.get(queue.peek()) != 1) {
            queue.remove();
        }
    }
}
