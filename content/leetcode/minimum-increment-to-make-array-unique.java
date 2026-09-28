class Solution {
    public int minIncrementForUnique(int[] nums) {
        Arrays.sort(nums);
        int nextValue = 0;
        int moves = 0;
        for (int value : nums) {
            int chosen = Math.max(nextValue, value);
            moves += chosen - value;
            nextValue = chosen + 1;
        }
        return moves;
    }
}
