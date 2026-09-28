class Solution {
    public List<Integer> findLonely(int[] nums) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums) {
            counts.put(value, counts.getOrDefault(value, 0) + 1);
        }
        List<Integer> result = new ArrayList<>();
        for (int value : nums) {
            if (counts.get(value) == 1
                    && !counts.containsKey(value - 1)
                    && !counts.containsKey(value + 1)) {
                result.add(value);
            }
        }
        return result;
    }
}
