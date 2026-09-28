class Solution {
    public boolean isTrionic(int[] nums) {
        int peak = walkUp(nums, 0);
        if (peak == 0) {
            return false;
        }
        int valley = walkDown(nums, peak);
        if (valley == peak || valley == nums.length - 1) {
            return false;
        }
        return walkUp(nums, valley) == nums.length - 1;
    }

    private int walkUp(int[] nums, int index) {
        while (index + 1 < nums.length && nums[index] < nums[index + 1]) {
            index++;
        }
        return index;
    }

    private int walkDown(int[] nums, int index) {
        while (index + 1 < nums.length && nums[index] > nums[index + 1]) {
            index++;
        }
        return index;
    }
}
