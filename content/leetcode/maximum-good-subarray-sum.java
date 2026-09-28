class Solution {
    public long maximumSubarraySum(int[] nums, int k) {
        Map<Integer, Long> minimumPrefix = new HashMap<>();
        long prefix = 0;
        long answer = Long.MIN_VALUE;
        for (int value : nums) {
            minimumPrefix.put(value, Math.min(minimumPrefix.getOrDefault(value, prefix), prefix));
            prefix += value;
            int lowerEndpoint = value - k;
            int upperEndpoint = value + k;
            if (minimumPrefix.containsKey(lowerEndpoint)) {
                answer = Math.max(answer, prefix - minimumPrefix.get(lowerEndpoint));
            }
            if (minimumPrefix.containsKey(upperEndpoint)) {
                answer = Math.max(answer, prefix - minimumPrefix.get(upperEndpoint));
            }
        }
        return answer == Long.MIN_VALUE ? 0 : answer;
    }
}
