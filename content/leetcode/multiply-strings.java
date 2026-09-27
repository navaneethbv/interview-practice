class Solution {
    public String multiply(String num1, String num2) {
        int[] digitTotals = new int[num1.length() + num2.length()];

        for (int firstIndex = num1.length() - 1; firstIndex >= 0; firstIndex--) {
            for (int secondIndex = num2.length() - 1; secondIndex >= 0; secondIndex--) {
                int position = firstIndex + secondIndex + 1;
                digitTotals[position] += (num1.charAt(firstIndex) - '0')
                        * (num2.charAt(secondIndex) - '0');
            }
        }

        for (int position = digitTotals.length - 1; position > 0; position--) {
            digitTotals[position - 1] += digitTotals[position] / 10;
            digitTotals[position] %= 10;
        }

        StringBuilder result = new StringBuilder();
        for (int digit : digitTotals) {
            if (result.length() > 0 || digit != 0) {
                result.append(digit);
            }
        }
        return result.length() == 0 ? "0" : result.toString();
    }
}
