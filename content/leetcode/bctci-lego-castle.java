class Solution {
    public long legoBlocks(int n) {
        long blocks = 1;
        long width = 1;
        for (int story = 1; story < n; story++) {
            width = 2 * width + 1;
            blocks = 2 * blocks + width;
        }
        return blocks;
    }
}
