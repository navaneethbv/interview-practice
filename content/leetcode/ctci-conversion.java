class Solution {
    public int bitSwapRequired(int a, int b) {
        int difference = a ^ b;
        int flips = 0;
        while (difference != 0) {
            difference &= difference - 1;
            flips++;
        }
        return flips;
    }
}
