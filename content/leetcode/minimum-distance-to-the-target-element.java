class Solution {
    public int getMinDistance(int[] nums, int target, int start) {
        int best = nums.length;
        for (int index = 0; index < nums.length; index++) {
            if (nums[index] == target) {
                best = Math.min(best, Math.abs(index - start));
            }
        }
        return best;
    }
}
