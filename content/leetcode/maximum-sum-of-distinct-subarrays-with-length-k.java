class Solution {
    public long maximumSubarraySum(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        long windowSum = 0;
        long bestSum = 0;
        for (int right = 0; right < nums.length; right++) {
            counts.merge(nums[right], 1, Integer::sum);
            windowSum += nums[right];
            if (right >= k) {
                int oldValue = nums[right - k];
                windowSum -= oldValue;
                counts.put(oldValue, counts.get(oldValue) - 1);
                if (counts.get(oldValue) == 0) {
                    counts.remove(oldValue);
                }
            }
            if (right >= k - 1 && counts.size() == k) {
                bestSum = Math.max(bestSum, windowSum);
            }
        }
        return bestSum;
    }
}
