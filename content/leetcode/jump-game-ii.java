class Solution {
    public int jump(int[] nums) {
        int jumps = 0;
        int currentEnd = 0;
        int farthestReachable = 0;

        for (int index = 0; index < nums.length - 1; index++) {
            farthestReachable = Math.max(
                    farthestReachable, index + nums[index]
            );
            if (index == currentEnd) {
                jumps++;
                currentEnd = farthestReachable;
            }
        }
        return jumps;
    }
}
