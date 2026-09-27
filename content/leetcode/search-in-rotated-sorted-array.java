class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int middle = left + (right - left) / 2;
            if (nums[middle] == target) {
                return middle;
            }
            if (targetIsOnLeft(nums, target, left, middle, right)) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }
        return -1;
    }

    private boolean targetIsOnLeft(int[] nums, int target, int left, int middle, int right) {
        if (nums[left] <= nums[middle]) {
            return nums[left] <= target && target < nums[middle];
        }
        return !(nums[middle] < target && target <= nums[right]);
    }
}
