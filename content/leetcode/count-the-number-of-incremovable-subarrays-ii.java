class Solution {
    public long incremovableSubarrayCount(int[] nums) {
        int n = nums.length, i = 0;
        while (i + 1 < n && nums[i] < nums[i + 1]) {
            i++;
        }
        if (i == n - 1) {
            return (long) n * (n + 1) / 2;
        }
        long result = i + 2;
        for (int j = n - 1; ; j--) {
            while (i >= 0 && nums[i] >= nums[j]) {
                i--;
            }
            result += i + 2;
            if (j == 0 || nums[j - 1] >= nums[j]) {
                return result;
            }
        }
    }
}
