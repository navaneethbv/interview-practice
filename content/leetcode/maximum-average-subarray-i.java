class Solution {
    public double findMaxAverage(int[] nums, int k) {
        int windowSum = 0;
        for (int index = 0; index < k; index++) {
            windowSum += nums[index];
        }
        int bestSum = windowSum;
        for (int right = k; right < nums.length; right++) {
            windowSum += nums[right] - nums[right - k];
            bestSum = Math.max(bestSum, windowSum);
        }
        return (double) bestSum / k;
    }
}
