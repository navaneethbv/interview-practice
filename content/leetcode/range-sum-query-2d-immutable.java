class NumMatrix {
    private long[][] prefix;

    public NumMatrix(int[][] matrix) {
        int rows = matrix.length;
        int columns = matrix[0].length;
        prefix = new long[rows + 1][columns + 1];
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                prefix[row + 1][column + 1] = matrix[row][column]
                        + prefix[row][column + 1]
                        + prefix[row + 1][column]
                        - prefix[row][column];
            }
        }
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        long total = prefix[row2 + 1][col2 + 1]
                - prefix[row1][col2 + 1]
                - prefix[row2 + 1][col1]
                + prefix[row1][col1];
        return (int) total;
    }
}
