class Solution {
    public int countGoodStrings(int low, int high, int zero, int one) {
        int modulus = 1_000_000_007;
        int[] ways = new int[high + 1];
        ways[0] = 1;
        int total = 0;
        for (int length = 1; length <= high; length++) {
            if (length >= zero) {
                ways[length] += ways[length - zero];
            }
            if (length >= one) {
                ways[length] += ways[length - one];
            }
            ways[length] %= modulus;
            if (length >= low) {
                total = (total + ways[length]) % modulus;
            }
        }
        return total;
    }
}
