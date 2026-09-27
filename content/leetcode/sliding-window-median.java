class Solution {
    public double[] medianSlidingWindow(int[] nums, int k) {
        TreeMap<Integer, Integer> lower = new TreeMap<>();
        TreeMap<Integer, Integer> upper = new TreeMap<>();
        int[] sizes = new int[2];
        double[] medians = new double[nums.length - k + 1];

        for (int index = 0; index < nums.length; index++) {
            addValue(lower, upper, sizes, nums[index]);
            if (index >= k) {
                removeValue(lower, upper, sizes, nums[index - k]);
            }
            rebalance(lower, upper, sizes);

            if (index >= k - 1) {
                medians[index - k + 1] = median(lower, upper, k);
            }
        }

        return medians;
    }

    private void addValue(
            TreeMap<Integer, Integer> lower,
            TreeMap<Integer, Integer> upper,
            int[] sizes,
            int value) {
        if (lower.isEmpty() || value <= lower.lastKey()) {
            changeCount(lower, value, 1);
            sizes[0]++;
        } else {
            changeCount(upper, value, 1);
            sizes[1]++;
        }
    }

    private void removeValue(
            TreeMap<Integer, Integer> lower,
            TreeMap<Integer, Integer> upper,
            int[] sizes,
            int value) {
        if (lower.containsKey(value)) {
            changeCount(lower, value, -1);
            sizes[0]--;
        } else {
            changeCount(upper, value, -1);
            sizes[1]--;
        }
    }

    private void rebalance(
            TreeMap<Integer, Integer> lower,
            TreeMap<Integer, Integer> upper,
            int[] sizes) {
        while (sizes[0] > sizes[1] + 1) {
            int value = lower.lastKey();
            changeCount(lower, value, -1);
            changeCount(upper, value, 1);
            sizes[0]--;
            sizes[1]++;
        }
        while (sizes[0] < sizes[1]) {
            int value = upper.firstKey();
            changeCount(upper, value, -1);
            changeCount(lower, value, 1);
            sizes[1]--;
            sizes[0]++;
        }
    }

    private void changeCount(TreeMap<Integer, Integer> values, int value, int delta) {
        int updated = values.getOrDefault(value, 0) + delta;
        if (updated == 0) {
            values.remove(value);
        } else {
            values.put(value, updated);
        }
    }

    private double median(
            TreeMap<Integer, Integer> lower,
            TreeMap<Integer, Integer> upper,
            int windowSize) {
        if (windowSize % 2 == 1) {
            return lower.lastKey();
        }
        return ((double) lower.lastKey() + upper.firstKey()) / 2.0;
    }
}
