class Solution {
    public boolean isNumber(String s) {
        int index = skipSign(s, 0);
        int length = s.length();
        int mantissaStart = index;
        index = readDigits(s, index);
        int mantissaDigits = index - mantissaStart;
        if (index < length && s.charAt(index) == '.') {
            index++;
            int fractionStart = index;
            index = readDigits(s, index);
            mantissaDigits += index - fractionStart;
        }
        if (mantissaDigits == 0) {
            return false;
        }
        if (index < length && (s.charAt(index) == 'e' || s.charAt(index) == 'E')) {
            index = skipSign(s, index + 1);
            int exponentStart = index;
            index = readDigits(s, index);
            if (index == exponentStart) {
                return false;
            }
        }
        return index == length;
    }

    private int skipSign(String s, int index) {
        if (index < s.length() && (s.charAt(index) == '+' || s.charAt(index) == '-')) {
            return index + 1;
        }
        return index;
    }

    private int readDigits(String s, int index) {
        while (index < s.length() && isDigit(s.charAt(index))) {
            index++;
        }
        return index;
    }

    private boolean isDigit(char character) {
        return character >= '0' && character <= '9';
    }
}
