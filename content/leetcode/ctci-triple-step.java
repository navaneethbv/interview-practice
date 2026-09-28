class Solution {
    private static final int MOD = 1_000_000_007;

    public int countWays(int n) {
        long threeBelow = 0;
        long twoBelow = 0;
        long oneBelow = 1;
        for (int step = 0; step < n; step++) {
            long current = (threeBelow + twoBelow + oneBelow) % MOD;
            threeBelow = twoBelow;
            twoBelow = oneBelow;
            oneBelow = current;
        }
        return (int) oneBelow;
    }
}
