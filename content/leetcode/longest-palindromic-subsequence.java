class Solution {
    public int longestPalindromeSubseq(String s) {
        int[] lengths = new int[s.length()];
        for (int left = s.length() - 1; left >= 0; left--) {
            int diagonal = 0;
            lengths[left] = 1;
            for (int right = left + 1; right < s.length(); right++) {
                int previous = lengths[right];
                if (s.charAt(left) == s.charAt(right)) {
                    lengths[right] = diagonal + 2;
                } else {
                    lengths[right] = Math.max(lengths[right], lengths[right - 1]);
                }
                diagonal = previous;
            }
        }
        return lengths[s.length() - 1];
    }
}
