class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        Map<Integer, Integer> ways = new HashMap<>();
        ways.put(0, 1);

        for (int value : nums) {
            Map<Integer, Integer> nextWays = new HashMap<>();
            for (Map.Entry<Integer, Integer> entry : ways.entrySet()) {
                int total = entry.getKey();
                int count = entry.getValue();
                nextWays.merge(total + value, count, Integer::sum);
                nextWays.merge(total - value, count, Integer::sum);
            }
            ways = nextWays;
        }

        return ways.getOrDefault(target, 0);
    }
}
