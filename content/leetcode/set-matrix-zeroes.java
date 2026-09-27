class Solution {
    public void setZeroes(int[][] matrix) {
        boolean firstRow = false;
        boolean firstColumn = false;
        for (int value : matrix[0]) {
            firstRow |= value == 0;
        }
        for (int[] row : matrix) {
            firstColumn |= row[0] == 0;
        }
        markHeaders(matrix);
        clearFromHeaders(matrix);
        if (firstRow) {
            Arrays.fill(matrix[0], 0);
        }
        if (firstColumn) {
            for (int[] row : matrix) {
                row[0] = 0;
            }
        }
    }

    private void markHeaders(int[][] matrix) {
        for (int row = 1; row < matrix.length; row++) {
            for (int column = 1; column < matrix[0].length; column++) {
                if (matrix[row][column] == 0) {
                    matrix[row][0] = 0;
                    matrix[0][column] = 0;
                }
            }
        }
    }

    private void clearFromHeaders(int[][] matrix) {
        for (int row = 1; row < matrix.length; row++) {
            for (int column = 1; column < matrix[0].length; column++) {
                if (matrix[row][0] == 0 || matrix[0][column] == 0) {
                    matrix[row][column] = 0;
                }
            }
        }
    }
}
