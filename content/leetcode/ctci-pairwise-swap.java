class Solution {
    private static final int EVEN_BITS = 0x55555555;
    private static final int ODD_BITS = 0xaaaaaaaa;

    public int swapOddEvenBits(int n) {
        return ((n & ODD_BITS) >>> 1) | ((n & EVEN_BITS) << 1);
    }
}
