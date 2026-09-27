class Solution {
    public int reverse(int x) {
        int reversed = 0;
        while (x != 0) {
            int digit = x % 10;
            x /= 10;
            if (wouldOverflow(reversed, digit)) {
                return 0;
            }
            reversed = reversed * 10 + digit;
        }
        return reversed;
    }

    private boolean wouldOverflow(int value, int digit) {
        return value > 214748364
                || value < -214748364
                || value == 214748364 && digit > 7
                || value == -214748364 && digit < -8;
    }
}
