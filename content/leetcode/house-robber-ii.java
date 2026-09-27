class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1) {
            return nums[0];
        }
        return Math.max(linear(nums, 0, nums.length - 1), linear(nums, 1, nums.length));
    }

    private int linear(int[] nums, int start, int end) {
        int older = 0;
        int previous = 0;
        for (int index = start; index < end; index++) {
            int next = Math.max(previous, older + nums[index]);
            older = previous;
            previous = next;
        }
        return previous;
    }
}
