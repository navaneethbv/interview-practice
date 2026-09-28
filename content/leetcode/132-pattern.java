class Solution {
    public boolean find132pattern(int[] nums) {
        Deque<Integer> decreasingCandidates = new ArrayDeque<>();
        int middleValue = Integer.MIN_VALUE;
        for (int index = nums.length - 1; index >= 0; index--) {
            int value = nums[index];
            if (value < middleValue) {
                return true;
            }
            while (!decreasingCandidates.isEmpty() && decreasingCandidates.peek() < value) {
                middleValue = decreasingCandidates.pop();
            }
            decreasingCandidates.push(value);
        }
        return false;
    }
}
