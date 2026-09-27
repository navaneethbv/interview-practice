class Solution {
    public int[] rearrangeArray(int[] nums) {
        int[] result = new int[nums.length];
        int positiveIndex = 0;
        int negativeIndex = 1;
        for (int value : nums) {
            if (value > 0) {
                result[positiveIndex] = value;
                positiveIndex += 2;
            } else {
                result[negativeIndex] = value;
                negativeIndex += 2;
            }
        }
        return result;
    }
}
