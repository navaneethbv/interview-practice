class Solution {
    private final int[] nums;
    private final Random random = new Random();

    public Solution(int[] nums) {
        this.nums = nums;
    }

    public int pick(int target) {
        int chosen = -1;
        int seen = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                seen++;
                if (random.nextInt(seen) == 0) {
                    chosen = i;
                }
            }
        }
        return chosen;
    }
}
