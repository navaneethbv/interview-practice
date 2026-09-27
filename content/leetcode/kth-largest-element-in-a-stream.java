class KthLargest {
    private final int k;
    private final PriorityQueue<Integer> heap = new PriorityQueue<>();

    public KthLargest(int k, int[] nums) {
        this.k = k;
        for (int value : nums) {
            retain(value);
        }
    }

    private void retain(int value) {
        heap.add(value);
        if (heap.size() > k) {
            heap.remove();
        }
    }

    public int add(int val) {
        retain(val);
        return heap.peek();
    }
}
