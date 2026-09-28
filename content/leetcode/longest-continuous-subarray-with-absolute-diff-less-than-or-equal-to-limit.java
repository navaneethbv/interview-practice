class Solution {
    public int longestSubarray(int[] nums, int limit) {
        Deque<Integer> minimumIndices = new ArrayDeque<>();
        Deque<Integer> maximumIndices = new ArrayDeque<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < nums.length; right++) {
            while (!minimumIndices.isEmpty() && nums[minimumIndices.peekLast()] > nums[right]) {
                minimumIndices.removeLast();
            }
            while (!maximumIndices.isEmpty() && nums[maximumIndices.peekLast()] < nums[right]) {
                maximumIndices.removeLast();
            }
            minimumIndices.addLast(right);
            maximumIndices.addLast(right);
            while (nums[maximumIndices.peekFirst()] - nums[minimumIndices.peekFirst()] > limit) {
                if (minimumIndices.peekFirst() == left) {
                    minimumIndices.removeFirst();
                }
                if (maximumIndices.peekFirst() == left) {
                    maximumIndices.removeFirst();
                }
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
