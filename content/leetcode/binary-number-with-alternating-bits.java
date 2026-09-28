class Solution {
    public boolean hasAlternatingBits(int n) {
        int previousBit = -1;
        while (n > 0) {
            int bit = n & 1;
            if (bit == previousBit) {
                return false;
            }
            previousBit = bit;
            n >>>= 1;
        }
        return true;
    }
}
