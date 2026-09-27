class Solution {
    public String removeKdigits(String num, int k) {
        StringBuilder monotonicDigits = new StringBuilder();

        for (int index = 0; index < num.length(); index++) {
            char digit = num.charAt(index);
            while (k > 0 && monotonicDigits.length() > 0
                    && monotonicDigits.charAt(monotonicDigits.length() - 1) > digit) {
                monotonicDigits.setLength(monotonicDigits.length() - 1);
                k--;
            }
            monotonicDigits.append(digit);
        }

        if (k > 0) {
            monotonicDigits.setLength(monotonicDigits.length() - k);
        }

        int firstNonzero = 0;
        while (firstNonzero < monotonicDigits.length()
                && monotonicDigits.charAt(firstNonzero) == '0') {
            firstNonzero++;
        }
        return firstNonzero == monotonicDigits.length()
                ? "0"
                : monotonicDigits.substring(firstNonzero);
    }
}
