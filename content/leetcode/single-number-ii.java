class Solution {
    public int singleNumber(int[] nums) {
        int result = 0;

        for (int bit = 0; bit < 32; bit++) {
            int setBits = 0;
            for (int value : nums) {
                setBits += (value >>> bit) & 1;
            }
            if (setBits % 3 != 0) {
                result |= 1 << bit;
            }
        }
        return result;
    }
}
