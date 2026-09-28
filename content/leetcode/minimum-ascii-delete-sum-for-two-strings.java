class Solution {
    public int minimumDeleteSum(String s1, String s2) {
        int[] dp = new int[s2.length() + 1];
        for (int column = 1; column <= s2.length(); column++) {
            dp[column] = dp[column - 1] + s2.charAt(column - 1);
        }
        for (int row = 1; row <= s1.length(); row++) {
            int previousDiagonal = dp[0];
            dp[0] += s1.charAt(row - 1);
            for (int column = 1; column <= s2.length(); column++) {
                int oldValue = dp[column];
                if (s1.charAt(row - 1) == s2.charAt(column - 1)) {
                    dp[column] = previousDiagonal;
                } else {
                    int deleteFirst = dp[column] + s1.charAt(row - 1);
                    int deleteSecond = dp[column - 1] + s2.charAt(column - 1);
                    dp[column] = Math.min(deleteFirst, deleteSecond);
                }
                previousDiagonal = oldValue;
            }
        }
        return dp[s2.length()];
    }
}
