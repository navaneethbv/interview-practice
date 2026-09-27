class Solution {
    public int[] runningSum(int[] nums) {
        int[] runningTotals = new int[nums.length];
        int total = 0;
        for (int index = 0; index < nums.length; index++) {
            total += nums[index];
            runningTotals[index] = total;
        }
        return runningTotals;
    }
}
