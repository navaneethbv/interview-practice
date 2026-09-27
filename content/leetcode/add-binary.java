class Solution {
    public String addBinary(String a, String b) {
        int leftIndex = a.length() - 1;
        int rightIndex = b.length() - 1;
        int carry = 0;
        StringBuilder digits = new StringBuilder();
        while (leftIndex >= 0 || rightIndex >= 0 || carry > 0) {
            int columnTotal = carry;
            if (leftIndex >= 0) {
                columnTotal += a.charAt(leftIndex--) - '0';
            }
            if (rightIndex >= 0) {
                columnTotal += b.charAt(rightIndex--) - '0';
            }
            digits.append(columnTotal % 2);
            carry = columnTotal / 2;
        }
        return digits.reverse().toString();
    }
}
