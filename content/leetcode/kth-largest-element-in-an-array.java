class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int value : nums) {
            heap.add(value);
            if (heap.size() > k) {
                heap.remove();
            }
        }
        return heap.peek();
    }
}
