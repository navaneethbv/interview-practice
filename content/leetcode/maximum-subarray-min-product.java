class Solution {
    public int maxSumMinProduct(int[] nums) {
        long[] prefix = new long[nums.length + 1];
        for (int index = 0; index < nums.length; index++) {
            prefix[index + 1] = prefix[index] + nums[index];
        }
        Deque<Integer> stack = new ArrayDeque<>();
        long answer = 0;
        for (int right = 0; right <= nums.length; right++) {
            while (!stack.isEmpty()
                    && (right == nums.length || nums[stack.peek()] >= nums[right])) {
                int middle = stack.pop();
                int left = stack.isEmpty() ? 0 : stack.peek() + 1;
                long total = prefix[right] - prefix[left];
                answer = Math.max(answer, nums[middle] * total);
            }
            stack.push(right);
        }
        return (int) (answer % 1000000007);
    }
}
