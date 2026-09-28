class Solution {
    public int[] nextNumbers(int n) {
        return new int[] {next(n), previous(n)};
    }

    private int next(int n) {
        int value = n;
        int zeros = 0;
        int ones = 0;
        while ((value & 1) == 0) {
            zeros++;
            value >>= 1;
        }
        while ((value & 1) == 1) {
            ones++;
            value >>= 1;
        }
        if (zeros + ones >= 31) {
            return -1;
        }
        return n + (1 << zeros) + (1 << (ones - 1)) - 1;
    }

    private int previous(int n) {
        int value = n;
        int zeros = 0;
        int ones = 0;
        while ((value & 1) == 1) {
            ones++;
            value >>= 1;
        }
        if (value == 0) {
            return -1;
        }
        while ((value & 1) == 0) {
            zeros++;
            value >>= 1;
        }
        return n - (1 << ones) - (1 << (zeros - 1)) + 1;
    }
}
