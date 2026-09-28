class Solution {
    private static final long MOD = 1_000_000_007L;
    private String bound;
    private Long[][][] memo;

    private long visit(int index, int previous, int tight) {
        if (index == bound.length()) {
            return previous == 10 ? 0 : 1;
        }
        if (memo[index][previous][tight] != null) {
            return memo[index][previous][tight];
        }
        int limit = tight == 1 ? bound.charAt(index) - '0' : 9;
        long total = 0;
        for (int digit = 0; digit <= limit; digit++) {
            int nextTight = tight == 1 && digit == limit ? 1 : 0;
            if (previous == 10 && digit == 0) {
                total += visit(index + 1, 10, nextTight);
            } else if (previous == 10 || Math.abs(previous - digit) == 1) {
                total += visit(index + 1, digit, nextTight);
            }
        }
        memo[index][previous][tight] = total % MOD;
        return memo[index][previous][tight];
    }

    private long count(String value) {
        bound = value;
        memo = new Long[value.length()][11][2];
        return visit(0, 10, 1);
    }

    public int countSteppingNumbers(String low, String high) {
        long upper = count(high);
        String lower = new java.math.BigInteger(low).subtract(java.math.BigInteger.ONE).toString();
        return (int) ((upper - count(lower) + MOD) % MOD);
    }
}
