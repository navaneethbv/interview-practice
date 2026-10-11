class Solution {
    public int minOperations(int n) {
        int ops = 0;
        while (n != 0) {
            if ((n & 1) == 1) {
                n = (n & 3) == 3 ? n + 1 : n - 1;
                ops++;
            }
            n >>= 1;
        }
        return ops;
    }
}
