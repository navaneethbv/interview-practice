class Solution {
    public long minCost(int[] nums, int[] cost) {
        int[][] pairs = new int[nums.length][2];
        long totalCost = 0;
        for (int index = 0; index < nums.length; index++) {
            pairs[index] = new int[]{nums[index], cost[index]};
            totalCost += cost[index];
        }
        Arrays.sort(pairs, (first, second) -> Integer.compare(first[0], second[0]));
        long running = 0;
        int target = pairs[0][0];
        for (int[] pair : pairs) {
            running += pair[1];
            if (running >= (totalCost + 1) / 2) {
                target = pair[0];
                break;
            }
        }
        long answer = 0;
        for (int index = 0; index < nums.length; index++) {
            answer += (long) Math.abs(nums[index] - target) * cost[index];
        }
        return answer;
    }
}
