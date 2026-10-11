class Solution {
    public int waysToSplitArray(int[] nums) {
        long total = 0;
        for (int x : nums) {
            total += x;
        }
        long left = 0;
        int count = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            left += nums[i];
            if (left >= total - left) {
                count++;
            }
        }
        return count;
    }
}
