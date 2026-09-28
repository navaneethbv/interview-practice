class Solution {
    public int maxSubArrayLen(int[] nums, int k) {
        Map<Long, Integer> firstPrefix = new HashMap<>();
        firstPrefix.put(0L, -1);
        long prefix = 0;
        int best = 0;
        for (int index = 0; index < nums.length; index++) {
            prefix += nums[index];
            if (firstPrefix.containsKey(prefix - k)) {
                best = Math.max(best, index - firstPrefix.get(prefix - k));
            }
            firstPrefix.putIfAbsent(prefix, index);
        }
        return best;
    }
}
