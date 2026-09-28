class Solution {
    public int minLength(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        long distinctSum = 0;
        int left = 0;
        int best = nums.length + 1;
        for (int right = 0; right < nums.length; right++) {
            int value = nums[right];
            if (counts.getOrDefault(value, 0) == 0) {
                distinctSum += value;
            }
            counts.merge(value, 1, Integer::sum);
            while (distinctSum >= k) {
                best = Math.min(best, right - left + 1);
                int removed = nums[left++];
                counts.put(removed, counts.get(removed) - 1);
                if (counts.get(removed) == 0) {
                    distinctSum -= removed;
                }
            }
        }
        return best <= nums.length ? best : -1;
    }
}
