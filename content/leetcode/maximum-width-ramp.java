class Solution {
    public int maxWidthRamp(int[] nums) {
        Deque<Integer> decreasingIndices = new ArrayDeque<>();
        for (int index = 0; index < nums.length; index++) {
            if (decreasingIndices.isEmpty() || nums[index] < nums[decreasingIndices.peek()]) {
                decreasingIndices.push(index);
            }
        }
        int best = 0;
        for (int right = nums.length - 1; right >= 0; right--) {
            while (!decreasingIndices.isEmpty()
                    && nums[decreasingIndices.peek()] <= nums[right]) {
                best = Math.max(best, right - decreasingIndices.pop());
            }
        }
        return best;
    }
}
