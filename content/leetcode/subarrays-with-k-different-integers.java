class Solution {
    private int atMost(int[] nums, int distinctLimit) {
        Map<Integer, Integer> counts = new HashMap<>();
        int left = 0;
        int total = 0;
        for (int right = 0; right < nums.length; right++) {
            counts.merge(nums[right], 1, Integer::sum);
            while (counts.size() > distinctLimit) {
                int oldValue = nums[left++];
                counts.put(oldValue, counts.get(oldValue) - 1);
                if (counts.get(oldValue) == 0) {
                    counts.remove(oldValue);
                }
            }
            total += right - left + 1;
        }
        return total;
    }

    public int subarraysWithKDistinct(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
}
