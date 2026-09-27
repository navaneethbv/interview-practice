class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int runningSum = 0;
        int shortest = nums.length + 1;

        for (int right = 0; right < nums.length; right++) {
            runningSum += nums[right];
            while (runningSum >= target) {
                shortest = Math.min(shortest, right - left + 1);
                runningSum -= nums[left];
                left++;
            }
        }

        return shortest <= nums.length ? shortest : 0;
    }
}
