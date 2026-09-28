class Solution {
    public int[] smallerNumbersThanCurrent(int[] nums) {
        int[] counts = new int[101];
        for (int value : nums) {
            counts[value]++;
        }
        int numbersSmaller = 0;
        for (int value = 0; value < counts.length; value++) {
            int count = counts[value];
            counts[value] = numbersSmaller;
            numbersSmaller += count;
        }
        int[] result = new int[nums.length];
        for (int index = 0; index < nums.length; index++) {
            result[index] = counts[nums[index]];
        }
        return result;
    }
}
