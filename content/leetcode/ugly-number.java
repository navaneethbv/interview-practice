class Solution {
    public boolean isUgly(int n) {
        if (n <= 0) {
            return false;
        }

        for (int primeFactor : new int[]{2, 3, 5}) {
            while (n % primeFactor == 0) {
                n /= primeFactor;
            }
        }
        return n == 1;
    }
}
