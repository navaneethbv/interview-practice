class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> words = new HashSet<>(wordDict);
        int limit = 0;
        for (String word : words) {
            limit = Math.max(limit, word.length());
        }
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int end = 1; end <= s.length(); end++) {
            dp[end] = canFinishWord(s, end, limit, words, dp);
        }
        return dp[s.length()];
    }

    private boolean canFinishWord(String s, int end, int limit, Set<String> words, boolean[] dp) {
        for (int start = Math.max(0, end - limit); start < end; start++) {
            if (dp[start] && words.contains(s.substring(start, end))) {
                return true;
            }
        }
        return false;
    }
}
