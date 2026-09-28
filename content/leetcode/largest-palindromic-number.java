class Solution {
    public String largestPalindromic(String num) {
        int[] counts = new int[10];
        for (int index = 0; index < num.length(); index++) {
            counts[num.charAt(index) - '0']++;
        }
        StringBuilder left = new StringBuilder();
        appendPairs(counts, left);
        String middle = largestMiddle(counts);
        String right = new StringBuilder(left).reverse().toString();
        String result = left + middle + right;
        return result.isEmpty() ? "0" : result;
    }
    private void appendPairs(int[] counts, StringBuilder left) {
        for (int digit = 9; digit >= 0; digit--) {
            if (digit != 0 || left.length() > 0) {
                appendRepeated(left, digit, counts[digit] / 2);
                counts[digit] %= 2;
            }
        }
    }
    private void appendRepeated(StringBuilder builder, int digit, int count) {
        for (int index = 0; index < count; index++) {
            builder.append(digit);
        }
    }
    private String largestMiddle(int[] counts) {
        for (int digit = 9; digit >= 0; digit--) {
            if (counts[digit] > 0) {
                return String.valueOf(digit);
            }
        }
        return "";
    }
}
