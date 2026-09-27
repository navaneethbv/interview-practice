class RecentCounter {
    private final Deque<Integer> requests = new ArrayDeque<>();

    public int ping(int t) {
        requests.addLast(t);
        while (requests.peekFirst() < t - 3000) {
            requests.removeFirst();
        }
        return requests.size();
    }
}
