class Solution {
    public boolean checkSubarraySum(int[] nums, int k) {
        Map<Long, Integer> firstIndex = new HashMap<>();
        firstIndex.put(0L, -1);
        long remainder = 0;

        for (int index = 0; index < nums.length; index++) {
            remainder = (remainder + nums[index]) % k;
            if (firstIndex.containsKey(remainder)) {
                if (index - firstIndex.get(remainder) >= 2) {
                    return true;
                }
            } else {
                firstIndex.put(remainder, index);
            }
        }

        return false;
    }
}
