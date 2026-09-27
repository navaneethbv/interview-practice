class Solution {
    public int countGoodNumbers(long n) {
        long evenPositions = (n + 1) / 2;
        long oddPositions = n / 2;
        long result = power(5, evenPositions) * power(4, oddPositions) % 1000000007;
        return (int) result;
    }

    private long power(long base, long exponent) {
        long result = 1;
        while (exponent > 0) {
            if ((exponent & 1) != 0) {
                result = result * base % 1000000007;
            }
            base = base * base % 1000000007;
            exponent >>= 1;
        }
        return result;
    }
}
