class Solution {
    public int maxAbsoluteSum(int[] nums) {
        int prefix = 0;
        int lowest = 0;
        int highest = 0;
        for (int value : nums) {
            prefix += value;
            lowest = Math.min(lowest, prefix);
            highest = Math.max(highest, prefix);
        }
        return highest - lowest;
    }
}
