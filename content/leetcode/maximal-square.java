class Solution {
    public int maximalSquare(char[][] matrix) {
        int[] previousRow = new int[matrix[0].length + 1];
        int largestSide = 0;
        for (char[] row : matrix) {
            int[] currentRow = new int[previousRow.length];
            for (int column = 0; column < row.length; column++) {
                if (row[column] == '1') {
                    currentRow[column + 1] = 1 + Math.min(previousRow[column],
                            Math.min(previousRow[column + 1], currentRow[column]));
                    largestSide = Math.max(largestSide, currentRow[column + 1]);
                }
            }
            previousRow = currentRow;
        }
        return largestSide * largestSide;
    }
}
