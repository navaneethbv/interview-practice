class Solution {
    public int[] maxValue(int[] nums) {
        int[] suffixMinimum = buildSuffixMinimum(nums);
        int[] answer = new int[nums.length];
        int start = 0;
        int largest = 0;
        for (int index = 0; index < nums.length; index++) {
            largest = Math.max(largest, nums[index]);
            if (largest <= suffixMinimum[index + 1]) {
                Arrays.fill(answer, start, index + 1, largest);
                start = index + 1;
                largest = 0;
            }
        }
        return answer;
    }
    private int[] buildSuffixMinimum(int[] nums) {
        int[] suffix = new int[nums.length + 1];
        suffix[nums.length] = Integer.MAX_VALUE;
        for (int index = nums.length - 1; index >= 0; index--) {
            suffix[index] = Math.min(nums[index], suffix[index + 1]);
        }
        return suffix;
    }
}
