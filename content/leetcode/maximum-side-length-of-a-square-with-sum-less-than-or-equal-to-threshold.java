class Solution {
    public int maxSideLength(int[][] mat, int threshold) {
        int rows = mat.length;
        int columns = mat[0].length;
        int[][] prefix = new int[rows + 1][columns + 1];
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                prefix[row + 1][column + 1] = mat[row][column]
                        + prefix[row][column + 1] + prefix[row + 1][column]
                        - prefix[row][column];
            }
        }
        int low = 0;
        int high = Math.min(rows, columns);
        while (low < high) {
            int size = (low + high + 1) / 2;
            if (hasValidSquare(prefix, rows, columns, size, threshold)) {
                low = size;
            } else {
                high = size - 1;
            }
        }
        return low;
    }

    private boolean hasValidSquare(int[][] prefix, int rows, int columns,
                                   int size, int threshold) {
        for (int row = 0; row + size <= rows; row++) {
            for (int column = 0; column + size <= columns; column++) {
                int sum = prefix[row + size][column + size]
                        - prefix[row][column + size] - prefix[row + size][column]
                        + prefix[row][column];
                if (sum <= threshold) {
                    return true;
                }
            }
        }
        return false;
    }
}
