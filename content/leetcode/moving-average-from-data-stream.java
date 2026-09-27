class MovingAverage {
    private final int size;
    private final Deque<Integer> values = new ArrayDeque<>();
    private long total;

    public MovingAverage(int size) {
        this.size = size;
    }

    public double next(int val) {
        values.addLast(val);
        total += val;

        if (values.size() > size) {
            total -= values.removeFirst();
        }

        return (double) total / values.size();
    }
}
