class Solution {
    public boolean canJump(int[] nums) {
        int farthest = 0;
        for (int index = 0; index < nums.length; index++) {
            if (index > farthest) {
                return false;
            }
            farthest = Math.max(farthest, index + nums[index]);
            if (farthest >= nums.length - 1) {
                return true;
            }
        }
        return false;
    }
}
