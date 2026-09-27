class Solution {
    public boolean isMonotonic(int[] nums) {
        boolean nondecreasing = true;
        boolean nonincreasing = true;
        for (int index = 1; index < nums.length; index++) {
            nondecreasing &= nums[index] >= nums[index - 1];
            nonincreasing &= nums[index] <= nums[index - 1];
        }
        return nondecreasing || nonincreasing;
    }
}
