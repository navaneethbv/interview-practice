class Solution {
    public int numDecodings(String s) {
        int older = 1;
        int previous = s.charAt(0) == '0' ? 0 : 1;
        for (int index = 1; index < s.length(); index++) {
            long current = s.charAt(index) == '0' ? 0 : previous;
            int pair = (s.charAt(index - 1) - '0') * 10 + s.charAt(index) - '0';
            if (pair >= 10 && pair <= 26) {
                current += older;
            }
            older = previous;
            // Saturate prefixes that cannot contribute to a bounded final answer.
            previous = (int) Math.min(Integer.MAX_VALUE, current);
        }
        return previous;
    }
}
