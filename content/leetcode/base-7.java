class Solution {
public String convertToBase7(int num) {
    if (num == 0) {
        return "0";
    }
    boolean negative = num < 0;
    int magnitude = Math.abs(num);
    StringBuilder digits = new StringBuilder();
    while (magnitude > 0) {
        digits.append(magnitude % 7);
        magnitude /= 7;
    }
    if (negative) {
        digits.append('-');
    }
    return digits.reverse().toString();
}
}
