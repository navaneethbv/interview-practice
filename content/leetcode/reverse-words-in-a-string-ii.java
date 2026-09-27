class Solution {
    public void reverseWords(char[] s) {
        reverseRange(s, 0, s.length - 1);
        int start = 0;
        for (int end = 0; end <= s.length; end++) {
            if (end == s.length || s[end] == ' ') {
                reverseRange(s, start, end - 1);
                start = end + 1;
            }
        }
    }

    private void reverseRange(char[] s, int left, int right) {
        while (left < right) {
            char temporary = s[left];
            s[left] = s[right];
            s[right] = temporary;
            left++;
            right--;
        }
    }
}
