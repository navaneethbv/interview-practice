class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        Deque<Integer> candidates = new ArrayDeque<>();
        int[] result = new int[nums.length - k + 1];
        for (int index = 0; index < nums.length; index++) {
            while (!candidates.isEmpty() && candidates.peekFirst() <= index - k) {
                candidates.removeFirst();
            }
            while (!candidates.isEmpty() && nums[candidates.peekLast()] <= nums[index]) {
                candidates.removeLast();
            }
            candidates.addLast(index);
            if (index >= k - 1) {
                result[index - k + 1] = nums[candidates.peekFirst()];
            }
        }
        return result;
    }
}
