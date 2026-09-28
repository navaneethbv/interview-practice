class Solution {
    private long greatestCommonDivisor(long first, long second) {
        while (second != 0) {
            long remainder = first % second;
            first = second;
            second = remainder;
        }
        return first;
    }

    public int nthMagicalNumber(int n, int a, int b) {
        long left = Math.min(a, b);
        long right = (long) n * left;
        long leastCommonMultiple = (long) a * b / greatestCommonDivisor(a, b);
        while (left < right) {
            long middle = (left + right) / 2;
            long count = middle / a + middle / b - middle / leastCommonMultiple;
            if (count >= n) {
                right = middle;
            } else {
                left = middle + 1;
            }
        }
        return (int) (left % 1_000_000_007);
    }
}
