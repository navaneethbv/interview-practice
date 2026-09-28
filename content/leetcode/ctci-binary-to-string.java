class Solution {
    private static final int MAX_DIGITS = 32;

    public String printBinary(double num) {
        StringBuilder digits = new StringBuilder();
        while (num > 0) {
            if (digits.length() == MAX_DIGITS) {
                return "ERROR";
            }
            num *= 2;
            if (num >= 1) {
                digits.append('1');
                num -= 1;
            } else {
                digits.append('0');
            }
        }
        return "0." + digits;
    }
}
