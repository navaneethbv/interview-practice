class Solution {
    public int[] sortArray(int[] nums) {
        int length = nums.length;
        int[] temporary = new int[length];
        for (int width = 1; width < length; width *= 2) {
            for (int start = 0; start < length; start += 2 * width) {
                int middle = Math.min(start + width, length);
                int end = Math.min(start + 2 * width, length);
                mergeRun(nums, temporary, start, middle, end);
            }
            int[] swap = nums;
            nums = temporary;
            temporary = swap;
        }
        return nums;
    }

    private void mergeRun(int[] source, int[] target, int start, int middle, int end) {
        int left = start;
        int right = middle;
        for (int index = start; index < end; index++) {
            if (left < middle && (right == end || source[left] <= source[right])) {
                target[index] = source[left++];
            } else {
                target[index] = source[right++];
            }
        }
    }
}
