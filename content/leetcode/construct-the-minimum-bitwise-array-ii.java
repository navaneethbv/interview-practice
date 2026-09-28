class Solution {
    public int[] minBitwiseArray(List<Integer> nums) {
        int[] result = new int[nums.size()];
        for (int index = 0; index < nums.size(); index++) {
            int value = nums.get(index);
            if (value == 2) {
                result[index] = -1;
                continue;
            }
            int bit = 1;
            while ((value & bit) != 0) {
                bit <<= 1;
            }
            result[index] = value - (bit >> 1);
        }
        return result;
    }
}
