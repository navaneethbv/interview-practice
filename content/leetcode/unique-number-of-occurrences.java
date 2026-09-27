class Solution {
    public boolean uniqueOccurrences(int[] arr) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : arr) {
            counts.put(value, counts.getOrDefault(value, 0) + 1);
        }
        return new HashSet<>(counts.values()).size() == counts.size();
    }
}
