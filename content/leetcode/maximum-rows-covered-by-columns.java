class Solution {
    public int maximumRows(int[][] matrix, int numSelect) {
        int columnCount = matrix[0].length;
        int[] rowMasks = new int[matrix.length];
        for (int row = 0; row < matrix.length; row++) {
            for (int column = 0; column < columnCount; column++) {
                if (matrix[row][column] == 1) {
                    rowMasks[row] |= 1 << column;
                }
            }
        }
        int best = 0;
        int limit = 1 << columnCount;
        for (int selected = 0; selected < limit; selected++) {
            if (Integer.bitCount(selected) != numSelect) {
                continue;
            }
            int covered = 0;
            for (int rowMask : rowMasks) {
                if ((rowMask & selected) == rowMask) {
                    covered++;
                }
            }
            best = Math.max(best, covered);
        }
        return best;
    }
}
