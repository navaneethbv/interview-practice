class Solution {
    public int myAtoi(String s) {
        int index = 0;
        while (index < s.length() && s.charAt(index) == ' ') {
            index++;
        }

        int sign = 1;
        if (index < s.length()
                && (s.charAt(index) == '+' || s.charAt(index) == '-')) {
            sign = s.charAt(index) == '-' ? -1 : 1;
            index++;
        }

        long value = 0;
        while (index < s.length() && s.charAt(index) >= '0' && s.charAt(index) <= '9') {
            int digit = s.charAt(index) - '0';
            if (wouldOverflow(value, sign, digit)) {
                return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            }
            value = value * 10 + digit;
            index++;
        }
        return (int) (value * sign);
    }

    private boolean wouldOverflow(long value, int sign, int digit) {
        int limit = sign == 1 ? 7 : 8;
        return value > 214748364 || value == 214748364 && digit > limit;
    }
}
