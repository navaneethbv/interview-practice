class Solution {
    public boolean canPartition(int[] nums) {
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        if (total % 2 != 0) {
            return false;
        }

        int target = total / 2;
        boolean[] reachable = new boolean[target + 1];
        reachable[0] = true;
        for (int value : nums) {
            for (int current = target; current >= value; current--) {
                reachable[current] |= reachable[current - value];
            }
        }
        return reachable[target];
    }
}
