class Solution {
    public String longestCommonSubsequence(String s1, String s2) {
        int n = s1.length();
        int m = s2.length();
        int[][] table = new int[n + 1][m + 1];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                table[i][j] = s1.charAt(i) == s2.charAt(j)
                        ? table[i + 1][j + 1] + 1
                        : Math.max(table[i + 1][j], table[i][j + 1]);
            }
        }
        StringBuilder result = new StringBuilder();
        int i = 0;
        int j = 0;
        while (i < n && j < m) {
            if (s1.charAt(i) == s2.charAt(j)) {
                result.append(s1.charAt(i));
                i++;
                j++;
            } else if (table[i + 1][j] >= table[i][j + 1]) {
                i++;
            } else {
                j++;
            }
        }
        return result.toString();
    }
}
