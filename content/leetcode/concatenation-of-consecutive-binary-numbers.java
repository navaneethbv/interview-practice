class Solution {
    public int concatenatedBinary(int n) {
        long result = 0;
        int bitLength = 0;
        for (int value = 1; value <= n; value++) {
            if ((value & (value - 1)) == 0) {
                bitLength++;
            }
            result = ((result << bitLength) + value) % 1000000007;
        }
        return (int) result;
    }
}
