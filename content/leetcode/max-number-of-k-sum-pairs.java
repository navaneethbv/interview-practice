class Solution {
    public int maxOperations(int[] nums, int k) {
        Map<Integer, Integer> available = new HashMap<>();
        int total = 0;
        for (int value : nums) {
            int complement = k - value;
            int count = available.getOrDefault(complement, 0);
            if (count > 0) {
                available.put(complement, count - 1);
                total++;
            } else {
                available.put(value, available.getOrDefault(value, 0) + 1);
            }
        }
        return total;
    }
}
