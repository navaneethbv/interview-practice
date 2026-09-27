class Solution {
    public int[] getConcatenation(int[] nums) {
        int[] concatenated = new int[2 * nums.length];
        for (int index = 0; index < concatenated.length; index++) {
            concatenated[index] = nums[index % nums.length];
        }
        return concatenated;
    }
}
