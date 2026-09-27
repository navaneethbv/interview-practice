class Solution {
    public int[] sortArrayByParity(int[] nums) {
        int[] result = new int[nums.length];
        int nextIndex = 0;
        for (int value : nums) {
            if (value % 2 == 0) {
                result[nextIndex++] = value;
            }
        }
        for (int value : nums) {
            if (value % 2 != 0) {
                result[nextIndex++] = value;
            }
        }
        return result;
    }
}
