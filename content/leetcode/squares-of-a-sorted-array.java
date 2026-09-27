class Solution {
    public int[] sortedSquares(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        int[] squaredValues = new int[nums.length];
        for (int outputIndex = nums.length - 1; outputIndex >= 0; outputIndex--) {
            if (Math.abs(nums[left]) > Math.abs(nums[right])) {
                squaredValues[outputIndex] = nums[left] * nums[left];
                left++;
            } else {
                squaredValues[outputIndex] = nums[right] * nums[right];
                right--;
            }
        }
        return squaredValues;
    }
}
