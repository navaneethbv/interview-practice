class Solution {
    public int pivotIndex(int[] nums) {
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        int leftSum = 0;
        for (int index = 0; index < nums.length; index++) {
            int rightSum = total - leftSum - nums[index];
            if (leftSum == rightSum) {
                return index;
            }
            leftSum += nums[index];
        }
        return -1;
    }
}
