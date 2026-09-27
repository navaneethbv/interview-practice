class Solution {
    public int longestArithSeqLength(int[] nums) {
        List<Map<Integer, Integer>> ending = new ArrayList<>();
        for (int value : nums) {
            ending.add(new HashMap<>());
        }
        int best = 2;
        for (int right = 0; right < nums.length; right++) {
            for (int left = 0; left < right; left++) {
                int difference = nums[right] - nums[left];
                int length = ending.get(left).getOrDefault(difference, 1) + 1;
                Map<Integer, Integer> lengthsAtRight = ending.get(right);
                lengthsAtRight.put(difference,
                        Math.max(lengthsAtRight.getOrDefault(difference, 0), length));
                best = Math.max(best, length);
            }
        }
        return best;
    }
}
