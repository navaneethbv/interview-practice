class Solution {
    public int numSquarefulPerms(int[] nums) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums) {
            counts.put(value, counts.getOrDefault(value, 0) + 1);
        }
        Map<Integer, List<Integer>> neighbors = new HashMap<>();
        for (int value : counts.keySet()) {
            List<Integer> compatible = new ArrayList<>();
            for (int other : counts.keySet()) {
                if (isSquare((long) value + other)) {
                    compatible.add(other);
                }
            }
            neighbors.put(value, compatible);
        }
        return search(null, nums.length, counts, neighbors);
    }

    private int search(Integer previous, int remaining, Map<Integer, Integer> counts,
                       Map<Integer, List<Integer>> neighbors) {
        if (remaining == 0) {
            return 1;
        }
        Iterable<Integer> candidates = previous == null ? counts.keySet() : neighbors.get(previous);
        int total = 0;
        for (int value : candidates) {
            int available = counts.get(value);
            if (available == 0) {
                continue;
            }
            counts.put(value, available - 1);
            total += search(value, remaining - 1, counts, neighbors);
            counts.put(value, available);
        }
        return total;
    }

    private boolean isSquare(long value) {
        long root = (long) Math.sqrt(value);
        return root * root == value;
    }
}
