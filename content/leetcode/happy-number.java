class Solution {
    public boolean isHappy(int n) {
        Set<Integer> seen = new HashSet<>();
        while (n != 1 && seen.add(n)) {
            n = sumOfDigitSquares(n);
        }
        return n == 1;
    }

    private int sumOfDigitSquares(int number) {
        int total = 0;
        while (number > 0) {
            int digit = number % 10;
            total += digit * digit;
            number /= 10;
        }
        return total;
    }
}
