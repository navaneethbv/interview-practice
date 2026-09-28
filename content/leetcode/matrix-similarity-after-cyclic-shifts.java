class Solution {
    public boolean areSimilar(int[][] mat, int k) {
        int columns = mat[0].length;
        int shift = k % columns;
        for (int[] row : mat) {
            if (!matchesShift(row, shift)) {
                return false;
            }
        }
        return true;
    }

    private boolean matchesShift(int[] row, int shift) {
        for (int column = 0; column < row.length; column++) {
            if (row[column] != row[(column + shift) % row.length]) {
                return false;
            }
        }
        return true;
    }
}
