class Solution {
    public String addStrings(String num1, String num2) {
        int firstIndex = num1.length() - 1;
        int secondIndex = num2.length() - 1;
        int carry = 0;
        StringBuilder digits = new StringBuilder();

        while (firstIndex >= 0 || secondIndex >= 0 || carry != 0) {
            int firstDigit = firstIndex >= 0
                    ? num1.charAt(firstIndex--) - '0' : 0;
            int secondDigit = secondIndex >= 0
                    ? num2.charAt(secondIndex--) - '0' : 0;
            int total = firstDigit + secondDigit + carry;
            digits.append(total % 10);
            carry = total / 10;
        }

        return digits.reverse().toString();
    }
}
