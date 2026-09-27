class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixCounts = new HashMap<>();
        prefixCounts.put(0, 1);
        int runningSum = 0;
        int answer = 0;
        for (int value : nums) {
            runningSum += value;
            answer += prefixCounts.getOrDefault(runningSum - k, 0);
            prefixCounts.merge(runningSum, 1, Integer::sum);
        }
        return answer;
    }
}
