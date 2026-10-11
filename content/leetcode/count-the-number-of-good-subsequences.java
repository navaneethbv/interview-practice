class Solution {
    private static final long MOD = 1_000_000_007L;

    public int countGoodSubsequences(String s) {
        int n = s.length();
        int[] counts = new int[26];
        for (char c : s.toCharArray()) {
            counts[c - 'a']++;
        }
        long[] fact = new long[n + 1];
        long[] inv = new long[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) {
            fact[i] = fact[i - 1] * i % MOD;
        }
        inv[n] = pow(fact[n], MOD - 2);
        for (int i = n; i > 0; i--) {
            inv[i - 1] = inv[i] * i % MOD;
        }
        int max = 0;
        for (int c : counts) {
            max = Math.max(max, c);
        }
        long total = 0;
        for (int f = 1; f <= max; f++) {
            long ways = 1;
            for (int c : counts) {
                if (c >= f) {
                    ways = ways * (1 + fact[c] * inv[f] % MOD * inv[c - f] % MOD) % MOD;
                }
            }
            total = (total + ways - 1 + MOD) % MOD;
        }
        return (int) total;
    }

    private long pow(long base, long exp) {
        long result = 1;
        base %= MOD;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                result = result * base % MOD;
            }
            base = base * base % MOD;
            exp >>= 1;
        }
        return result;
    }
}
