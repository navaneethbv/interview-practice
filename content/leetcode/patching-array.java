class Solution {
    public int minPatches(int[] nums, int n) {
        long nextMissing = 1;
        int index = 0;
        int patches = 0;
        while (nextMissing <= n) {
            if (index < nums.length && nums[index] <= nextMissing) {
                nextMissing += nums[index];
                index++;
            } else {
                nextMissing *= 2;
                patches++;
            }
        }
        return patches;
    }
}
