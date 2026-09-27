class Solution {
    public int reversePairs(int[] nums) {
        return sortAndCount(nums, 0, nums.length);
    }

    private int sortAndCount(int[] nums, int start, int end) {
        if (end - start < 2) {
            return 0;
        }

        int middle = start + (end - start) / 2;
        int count = sortAndCount(nums, start, middle)
                + sortAndCount(nums, middle, end);
        count += countCrossPairs(nums, start, middle, end);
        merge(nums, start, middle, end);
        return count;
    }

    private int countCrossPairs(int[] nums, int start, int middle, int end) {
        int count = 0;
        int rightIndex = middle;
        for (int leftIndex = start; leftIndex < middle; leftIndex++) {
            while (rightIndex < end
                    && (long) nums[leftIndex] > 2L * nums[rightIndex]) {
                rightIndex++;
            }
            count += rightIndex - middle;
        }
        return count;
    }

    private void merge(int[] nums, int start, int middle, int end) {
        int[] merged = new int[end - start];
        int leftIndex = start;
        int rightIndex = middle;
        int outputIndex = 0;

        while (leftIndex < middle && rightIndex < end) {
            if (nums[leftIndex] <= nums[rightIndex]) {
                merged[outputIndex++] = nums[leftIndex++];
            } else {
                merged[outputIndex++] = nums[rightIndex++];
            }
        }
        while (leftIndex < middle) {
            merged[outputIndex++] = nums[leftIndex++];
        }
        while (rightIndex < end) {
            merged[outputIndex++] = nums[rightIndex++];
        }
        System.arraycopy(merged, 0, nums, start, merged.length);
    }
}
