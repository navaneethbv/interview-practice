class Solution {
    public int incremovableSubarrayCount(int[] nums) {
        int n = nums.length;
        int left = 0;
        while (left + 1 < n && nums[left] < nums[left + 1]) {
            left++;
        }
        if (left == n - 1) {
            return n * (n + 1) / 2;
        }
        int result = left + 2;
        int right = n - 1;
        while (true) {
            while (left >= 0 && nums[left] >= nums[right]) {
                left--;
            }
            result += left + 2;
            if (right == 0 || nums[right - 1] >= nums[right]) {
                break;
            }
            right--;
        }
        return result;
    }
}
