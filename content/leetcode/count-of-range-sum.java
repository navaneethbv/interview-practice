class Solution {
    public int countRangeSum(int[] nums, int lower, int upper) {
        long[] prefix = new long[nums.length + 1];
        for (int index = 0; index < nums.length; index++) {
            prefix[index + 1] = prefix[index] + nums[index];
        }
        return (int) countAndSort(prefix, 0, prefix.length, lower, upper);
    }

    private long countAndSort(long[] prefix, int start, int end, int lower, int upper) {
        if (end - start < 2) {
            return 0;
        }
        int middle = (start + end) / 2;
        long count = countAndSort(prefix, start, middle, lower, upper);
        count += countAndSort(prefix, middle, end, lower, upper);
        count += countCrossing(prefix, start, middle, end, lower, upper);
        merge(prefix, start, middle, end);
        return count;
    }

    private long countCrossing(long[] prefix, int start, int middle, int end, int lower, int upper) {
        int lowerIndex = middle;
        int upperIndex = middle;
        long count = 0;
        for (int left = start; left < middle; left++) {
            while (lowerIndex < end && prefix[lowerIndex] - prefix[left] < lower) {
                lowerIndex++;
            }
            while (upperIndex < end && prefix[upperIndex] - prefix[left] <= upper) {
                upperIndex++;
            }
            count += upperIndex - lowerIndex;
        }
        return count;
    }

    private void merge(long[] prefix, int start, int middle, int end) {
        long[] merged = new long[end - start];
        int left = start;
        int right = middle;
        int target = 0;
        while (left < middle || right < end) {
            if (right == end || (left < middle && prefix[left] <= prefix[right])) {
                merged[target++] = prefix[left++];
            } else {
                merged[target++] = prefix[right++];
            }
        }
        System.arraycopy(merged, 0, prefix, start, merged.length);
    }
}
