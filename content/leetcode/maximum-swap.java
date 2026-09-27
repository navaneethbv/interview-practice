class Solution {
    public int maximumSwap(int num) {
        char[] digits = String.valueOf(num).toCharArray();
        int[] lastPosition = new int[10];
        Arrays.fill(lastPosition, -1);

        for (int index = 0; index < digits.length; index++) {
            lastPosition[digits[index] - '0'] = index;
        }

        for (int index = 0; index < digits.length; index++) {
            int currentDigit = digits[index] - '0';
            for (int candidate = 9; candidate > currentDigit; candidate--) {
                if (lastPosition[candidate] > index) {
                    int swapIndex = lastPosition[candidate];
                    char temporary = digits[index];
                    digits[index] = digits[swapIndex];
                    digits[swapIndex] = temporary;
                    return Integer.parseInt(new String(digits));
                }
            }
        }

        return num;
    }
}
