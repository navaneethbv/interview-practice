class Solution {
    public int longestSubstring(String s, int k) {
        return solve(s, 0, s.length(), k);
    }

    private int solve(String s, int start, int end, int k) {
        if (end - start < k) {
            return 0;
        }
        int[] counts = countLetters(s, start, end);
        for (int index = start; index < end; index++) {
            if (counts[s.charAt(index) - 'a'] < k) {
                return splitAroundInvalid(s, start, end, index, counts, k);
            }
        }
        return end - start;
    }

    private int[] countLetters(String s, int start, int end) {
        int[] counts = new int[26];
        for (int index = start; index < end; index++) {
            counts[s.charAt(index) - 'a']++;
        }
        return counts;
    }

    private int splitAroundInvalid(String s, int start, int end, int invalid,
            int[] counts, int k) {
        int best = 0;
        int segmentStart = start;
        for (int index = invalid; index < end; index++) {
            if (counts[s.charAt(index) - 'a'] < k) {
                best = Math.max(best, solve(s, segmentStart, index, k));
                segmentStart = index + 1;
            }
        }
        return Math.max(best, solve(s, segmentStart, end, k));
    }
}
