class Solution {
    public int findPairs(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int number : nums) {
            counts.put(number, counts.getOrDefault(number, 0) + 1);
        }
        int pairs = 0;
        if (k == 0) {
            for (int count : counts.values()) {
                if (count > 1) {
                    pairs++;
                }
            }
            return pairs;
        }
        for (int number : counts.keySet()) {
            if (counts.containsKey(number + k)) {
                pairs++;
            }
        }
        return pairs;
    }
}
