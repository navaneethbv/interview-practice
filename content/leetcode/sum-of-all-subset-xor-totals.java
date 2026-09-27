class Solution {
    public int subsetXORSum(int[] nums) {
        int combined = 0;
        for (int value : nums) {
            combined |= value;
        }
        return combined * (1 << (nums.length - 1));
    }
}
