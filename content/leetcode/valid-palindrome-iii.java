class Solution {
    public boolean isValidPalindrome(String s, int k) {
        int[] dp = new int[s.length()];
        for (int left = s.length() - 2; left >= 0; left--) {
            int diagonal = 0;
            for (int right = left + 1; right < s.length(); right++) {
                int old = dp[right];
                if (s.charAt(left) == s.charAt(right)) {
                    dp[right] = diagonal;
                } else {
                    dp[right] = 1 + Math.min(dp[right], dp[right - 1]);
                }
                diagonal = old;
            }
        }
        return dp[s.length() - 1] <= k;
    }
}
