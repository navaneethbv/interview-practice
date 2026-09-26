class MedianOfAStream {
    PriorityQueue<Integer> lo = new PriorityQueue<>((a, b) -> b - a), hi = new PriorityQueue<>();
    public MedianOfAStream() {}
    public void insertNum(int num) {
        if (lo.isEmpty() || lo.peek() >= num) lo.add(num); else hi.add(num);
        if (lo.size() > hi.size() + 1) hi.add(lo.poll()); else if (lo.size() < hi.size()) lo.add(hi.poll());
    }
    public double findMedian() {
        if (lo.size() == hi.size()) return lo.peek() / 2.0 + hi.peek() / 2.0;
        return lo.peek();
    }
}
