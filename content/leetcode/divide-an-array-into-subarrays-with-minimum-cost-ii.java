class Solution {
    private int[] values;
    private int[] counts;
    private long[] sums;

    private void update(int value, int delta) {
        int index = Arrays.binarySearch(values, value) + 1;
        while (index < counts.length) {
            counts[index] += delta;
            sums[index] += (long) delta * value;
            index += index & -index;
        }
    }

    private long smallest(int amount) {
        int position = 0;
        long total = 0;
        for (int step = Integer.highestOneBit(values.length); step > 0; step >>= 1) {
            int nextPosition = position + step;
            if (nextPosition < counts.length && counts[nextPosition] < amount) {
                amount -= counts[nextPosition];
                total += sums[nextPosition];
                position = nextPosition;
            }
        }
        return total + (long) amount * values[position];
    }

    public long minimumCost(int[] nums, int k, int dist) {
        values = Arrays.stream(nums, 1, nums.length).distinct().sorted().toArray();
        counts = new int[values.length + 1];
        sums = new long[values.length + 1];
        int width = dist + 1;
        for (int index = 1; index <= width; index++) {
            update(nums[index], 1);
        }
        long best = smallest(k - 1);
        for (int right = width + 1; right < nums.length; right++) {
            update(nums[right - width], -1);
            update(nums[right], 1);
            best = Math.min(best, smallest(k - 1));
        }
        return nums[0] + best;
    }
}
