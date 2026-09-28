class Solution {
    private static final int MOD = 1_000_000_007;

    public int countPalindromicSplits(String s) {
        int n = s.length();
        if (n == 0) {
            return 0;
        }
        boolean[][] palindrome = new boolean[n][n];
        for (int start = n - 1; start >= 0; start--) {
            for (int end = start; end < n; end++) {
                palindrome[start][end] = s.charAt(start) == s.charAt(end) && (end - start < 2 || palindrome[start + 1][end - 1]);
            }
        }
        long[] ways = new long[n + 1];
        ways[0] = 1;
        for (int end = 1; end <= n; end++) {
            long total = 0;
            for (int start = 0; start < end; start++) {
                if (palindrome[start][end - 1]) {
                    total += ways[start];
                }
            }
            ways[end] = total % MOD;
        }
        return (int) ways[n];
    }
}
