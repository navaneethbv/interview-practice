class Solution {
    public int divide(int dividend, int divisor) {
        long dividendMagnitude = Math.abs((long) dividend);
        long divisorMagnitude = Math.abs((long) divisor);
        long quotient = 0;

        for (int shift = 31; shift >= 0; shift--) {
            long shiftedDivisor = divisorMagnitude << shift;
            if (shiftedDivisor <= dividendMagnitude) {
                dividendMagnitude -= shiftedDivisor;
                quotient |= 1L << shift;
            }
        }

        if ((dividend < 0) != (divisor < 0)) {
            quotient = -quotient;
        }
        return (int) Math.min(Integer.MAX_VALUE, Math.max(Integer.MIN_VALUE, quotient));
    }
}
