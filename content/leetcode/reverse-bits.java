class Solution {
    public int reverseBits(int n) {
        int result = 0;
        for (int bit = 0; bit < 32; bit++) {
            result = (result << 1) | (n & 1);
            n >>>= 1;
        }
        return result;
    }
}
