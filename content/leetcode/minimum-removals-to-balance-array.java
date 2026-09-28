class Solution {
    public int minRemoval(int[] nums, int k) {
        Arrays.sort(nums);
        int left = 0;
        int longest = 0;
        for (int right = 0; right < nums.length; right++) {
            while (nums[right] > (long) nums[left] * k) {
                left++;
            }
            longest = Math.max(longest, right - left + 1);
        }
        return nums.length - longest;
    }
}
