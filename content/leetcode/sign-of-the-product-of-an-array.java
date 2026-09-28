class Solution {
    public int arraySign(int[] nums) {
        int sign = 1;
        for (int value : nums) {
            if (value == 0) {
                return 0;
            }
            if (value < 0) {
                sign = -sign;
            }
        }
        return sign;
    }
}
