class Solution {
    public List<List<Integer>> pairSums(int[] nums, int target) {
        TreeMap<Integer, Integer> counts = new TreeMap<>();
        for (int value : nums) {
            counts.merge(value, 1, Integer::sum);
        }
        List<List<Integer>> pairs = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            int value = entry.getKey();
            long complement = (long) target - value;
            if (complement < value) {
                continue;
            }
            int matches;
            if (complement == value) {
                matches = entry.getValue() / 2;
            } else if (complement > Integer.MAX_VALUE) {
                matches = 0;
            } else {
                matches = Math.min(entry.getValue(), counts.getOrDefault((int) complement, 0));
            }
            for (int i = 0; i < matches; i++) {
                pairs.add(List.of(value, (int) complement));
            }
        }
        return pairs;
    }
}
