class Solution {
    public int insertBits(int N, int M, int i, int j) {
        int width = j - i + 1;
        int window = (int) (((1L << width) - 1) << i);
        return (N & ~window) | (M << i);
    }
}
