class SparseVector {
    private final Map<Integer, Integer> values = new HashMap<>();

    SparseVector(int[] nums) {
        for (int index = 0; index < nums.length; index++) {
            if (nums[index] != 0) {
                values.put(index, nums[index]);
            }
        }
    }

    public int dotProduct(SparseVector vec) {
        int total = 0;
        for (Map.Entry<Integer, Integer> entry : values.entrySet()) {
            total += entry.getValue() * vec.values.getOrDefault(entry.getKey(), 0);
        }
        return total;
    }
}
