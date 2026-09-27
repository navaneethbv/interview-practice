class Solution {
    public boolean search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int middle = left + (right - left) / 2;
            if (nums[middle] == target) {
                return true;
            }
            if (nums[left] == nums[middle] && nums[middle] == nums[right]) {
                left++;
                right--;
                continue;
            }
            if (targetIsRight(nums, left, middle, right, target)) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return false;
    }

    private boolean targetIsRight(int[] nums, int left, int middle, int right, int target) {
        if (nums[left] <= nums[middle]) {
            return !(nums[left] <= target && target < nums[middle]);
        }
        return nums[middle] < target && target <= nums[right];
    }
}
