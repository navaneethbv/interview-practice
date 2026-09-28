class Solution {
    public int nthSuperUglyNumber(int n, int[] primes) {
        long[] values = new long[n];
        int[] positions = new int[primes.length];
        values[0] = 1;
        for (int index = 1; index < n; index++) {
            long next = nextValue(values, positions, primes);
            values[index] = next;
            advanceEqualCandidates(values, positions, primes, next);
        }
        return (int) values[n - 1];
    }
    private long nextValue(long[] values, int[] positions, int[] primes) {
        long answer = Long.MAX_VALUE;
        for (int index = 0; index < primes.length; index++) {
            answer = Math.min(answer, (long) primes[index] * values[positions[index]]);
        }
        return answer;
    }
    private void advanceEqualCandidates(long[] values, int[] positions,
    int[] primes, long value) {
        for (int index = 0; index < primes.length; index++) {
            if ((long) primes[index] * values[positions[index]] == value) {
                positions[index]++;
            }
        }
    }
}
