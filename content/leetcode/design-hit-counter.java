class HitCounter {
    private Deque<Integer> hits = new ArrayDeque<>();

    public HitCounter() {
    }

    public void hit(int timestamp) {
        hits.add(timestamp);
    }

    public int getHits(int timestamp) {
        while (!hits.isEmpty() && hits.peek() <= timestamp - 300) {
            hits.remove();
        }
        return hits.size();
    }
}
