class Solution {
    public int[] findPeakGrid(int[][] mat) {
        int left = 0;
        int right = mat[0].length - 1;
        while (left <= right) {
            int column = (left + right) / 2;
            int row = tallestRow(mat, column);
            if (column > 0 && mat[row][column - 1] > mat[row][column]) {
                right = column - 1;
            } else if (column + 1 < mat[0].length && mat[row][column + 1] > mat[row][column]) {
                left = column + 1;
            } else {
                return new int[]{row, column};
            }
        }
        throw new IllegalStateException();
    }

    private int tallestRow(int[][] mat, int column) {
        int row = 0;
        for (int candidate = 1; candidate < mat.length; candidate++) {
            if (mat[candidate][column] > mat[row][column]) {
                row = candidate;
            }
        }
        return row;
    }
}
