class Solution {
    public int[] getSubarrayBeauty(int[] nums, int k, int x) {
        int[] frequencies = new int[101];
        int[] answer = new int[nums.length - k + 1];
        for (int index = 0; index < nums.length; index++) {
            frequencies[nums[index] + 50]++;
            if (index >= k) {
                frequencies[nums[index - k] + 50]--;
            }
            if (index >= k - 1) {
                answer[index - k + 1] = beauty(frequencies, x);
            }
        }
        return answer;
    }
    private int beauty(int[] frequencies, int rank) {
        int remaining = rank;
        for (int value = 0; value < 50; value++) {
            remaining -= frequencies[value];
            if (remaining <= 0) {
                return value - 50;
            }
        }
        return 0;
    }
}
