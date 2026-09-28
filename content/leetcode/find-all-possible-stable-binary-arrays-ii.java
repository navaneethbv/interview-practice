class Solution {
    public int numberOfStableArrays(int zero, int one, int limit) {
        long modulus = 1_000_000_007L;
        long[][] endingZero = new long[zero + 1][one + 1];
        long[][] endingOne = new long[zero + 1][one + 1];
        for (int count = 1; count <= Math.min(zero, limit); count++) {
            endingZero[count][0] = 1;
        }
        for (int count = 1; count <= Math.min(one, limit); count++) {
            endingOne[0][count] = 1;
        }
        for (int zeros = 1; zeros <= zero; zeros++) {
            for (int ones = 1; ones <= one; ones++) {
                long zeroWays = endingZero[zeros - 1][ones] + endingOne[zeros - 1][ones];
                if (zeros > limit) {
                    zeroWays -= endingOne[zeros - limit - 1][ones];
                }
                endingZero[zeros][ones] = (zeroWays + modulus) % modulus;
                long oneWays = endingZero[zeros][ones - 1] + endingOne[zeros][ones - 1];
                if (ones > limit) {
                    oneWays -= endingZero[zeros][ones - limit - 1];
                }
                endingOne[zeros][ones] = (oneWays + modulus) % modulus;
            }
        }
        return (int) ((endingZero[zero][one] + endingOne[zero][one]) % modulus);
    }
}
