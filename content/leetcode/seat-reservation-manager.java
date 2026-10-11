class SeatManager {
    private final PriorityQueue<Integer> freed = new PriorityQueue<>();
    private int next = 1;

    public SeatManager(int n) {
    }

    public int reserve() {
        if (!freed.isEmpty()) {
            return freed.poll();
        }
        return next++;
    }

    public void unreserve(int seatNumber) {
        freed.add(seatNumber);
    }
}
