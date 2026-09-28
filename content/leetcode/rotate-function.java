class Solution {
    public int maxRotateFunction(int[] nums) {
        long total = 0;
        long current = 0;
        for (int index = 0; index < nums.length; index++) {
            total += nums[index];
            current += (long) index * nums[index];
        }
        long answer = current;
        for (int index = nums.length - 1; index > 0; index--) {
            current += total - (long) nums.length * nums[index];
            answer = Math.max(answer, current);
        }
        return (int) answer;
    }
}
