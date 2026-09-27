class Solution {
    public String longestPalindrome(String s) {
        int start = 0;
        int bestLength = 1;
        for (int center = 0; center < s.length(); center++) {
            int length = Math.max(expand(s, center, center), expand(s, center, center + 1));
            if (length > bestLength) {
                start = center - (length - 1) / 2;
                bestLength = length;
            }
        }
        return s.substring(start, start + bestLength);
    }

    private int expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}
