class MedianFinder {
    private final PriorityQueue<Integer> low = new PriorityQueue<>(Collections.reverseOrder());
    private final PriorityQueue<Integer> high = new PriorityQueue<>();

    public MedianFinder() {}

    public void addNum(int num) {
        low.add(num);
        high.add(low.remove());
        if (high.size() > low.size()) {
            low.add(high.remove());
        }
    }

    public double findMedian() {
        if (low.size() > high.size()) {
            return low.peek();
        }
        return ((double) low.peek() + high.peek()) / 2;
    }
}
