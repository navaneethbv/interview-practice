class CircuitBreaker {
    private final int threshold;
    private final int window;
    private final int cooldown;
    private final Deque<Integer> failures = new ArrayDeque<>();
    private long openUntil = -1;

    public CircuitBreaker(int threshold, int window, int cooldown) {
        this.threshold = threshold;
        this.window = window;
        this.cooldown = cooldown;
    }

    public boolean call(int timestamp, boolean success) {
        if (openUntil >= 0) {
            if (timestamp < openUntil) {
                return false;
            }
            failures.clear();
            openUntil = -1;
        }
        while (!failures.isEmpty() && failures.peekFirst() <= (long) timestamp - window) {
            failures.removeFirst();
        }
        if (!success) {
            failures.addLast(timestamp);
            if (failures.size() >= threshold) {
                openUntil = (long) timestamp + cooldown;
            }
        }
        return true;
    }
}
