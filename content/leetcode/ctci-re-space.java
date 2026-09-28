class Solution {
    public int respace(String[] dictionary, String sentence) {
        Set<String> words = new HashSet<>(Arrays.asList(dictionary));
        int longest = 0;
        for (String word : words) {
            longest = Math.max(longest, word.length());
        }
        int n = sentence.length();
        int[] best = new int[n + 1];
        for (int start = n - 1; start >= 0; start--) {
            best[start] = best[start + 1] + 1;
            int limit = Math.min(n, start + longest);
            for (int end = start + 1; end <= limit; end++) {
                if (words.contains(sentence.substring(start, end))) {
                    best[start] = Math.min(best[start], best[end]);
                }
            }
        }
        return best[0];
    }
}
