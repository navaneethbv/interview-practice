class Solution {
    public String fractionToDecimal(int numerator, int denominator) {
        if (numerator == 0) {
            return "0";
        }
        StringBuilder result = new StringBuilder();
        if ((numerator < 0) != (denominator < 0)) {
            result.append('-');
        }
        long dividend = Math.abs((long) numerator);
        long divisor = Math.abs((long) denominator);
        result.append(dividend / divisor);
        long remainder = dividend % divisor;
        if (remainder == 0) {
            return result.toString();
        }
        result.append('.');
        Map<Long, Integer> seen = new HashMap<>();
        while (remainder != 0) {
            if (seen.containsKey(remainder)) {
                result.insert(seen.get(remainder).intValue(), '(');
                result.append(')');
                break;
            }
            seen.put(remainder, result.length());
            remainder *= 10;
            result.append(remainder / divisor);
            remainder %= divisor;
        }
        return result.toString();
    }
}
