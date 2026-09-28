class NumMatrix {
    private final int rows;
    private final int columns;
    private final int[][] values;
    private final int[][] tree;

    public NumMatrix(int[][] matrix) {
        rows = matrix.length;
        columns = matrix[0].length;
        values = new int[rows][columns];
        tree = new int[rows + 1][columns + 1];
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                update(row, column, matrix[row][column]);
            }
        }
    }

    public void update(int row, int column, int value) {
        int delta = value - values[row][column];
        values[row][column] = value;
        for (int treeRow = row + 1; treeRow <= rows; treeRow += treeRow & -treeRow) {
            for (int treeColumn = column + 1; treeColumn <= columns; treeColumn += treeColumn & -treeColumn) {
                tree[treeRow][treeColumn] += delta;
            }
        }
    }

    private int prefix(int row, int column) {
        int total = 0;
        for (int treeRow = row; treeRow > 0; treeRow -= treeRow & -treeRow) {
            for (int treeColumn = column; treeColumn > 0; treeColumn -= treeColumn & -treeColumn) {
                total += tree[treeRow][treeColumn];
            }
        }
        return total;
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        return prefix(row2 + 1, col2 + 1) - prefix(row1, col2 + 1)
                - prefix(row2 + 1, col1) + prefix(row1, col1);
    }
}
