class Solution {
    public int countSubstrings(String s) {
        int total = 0;
        for (int center = 0; center < s.length(); center++) {
            total += countFromCenter(s, center, center);
            total += countFromCenter(s, center, center + 1);
        }
        return total;
    }

    private int countFromCenter(String s, int left, int right) {
        int count = 0;
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            count++;
            left--;
            right++;
        }
        return count;
    }
}
