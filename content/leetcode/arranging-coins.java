class Solution {
    public int arrangeCoins(int n) {
        long left = 0;
        long right = n;
        while (left <= right) {
            long middle = (left + right) / 2;
            long coinsNeeded = middle * (middle + 1) / 2;
            if (coinsNeeded <= n) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return (int) right;
    }
}
