class Solution {
    public int minOperations(int[] nums, int x) {
        int target = Arrays.stream(nums).sum() - x;
        if (target < 0) {
            return -1;
        }
        if (target == 0) {
            return nums.length;
        }
        int left = 0;
        int windowSum = 0;
        int longest = -1;
        for (int right = 0; right < nums.length; right++) {
            windowSum += nums[right];
            while (windowSum > target) {
                windowSum -= nums[left++];
            }
            if (windowSum == target) {
                longest = Math.max(longest, right - left + 1);
            }
        }
        return longest >= 0 ? nums.length - longest : -1;
    }
}
