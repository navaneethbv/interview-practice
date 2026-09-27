class Solution {
    public int[] findDiagonalOrder(int[][] mat) {
        int rows = mat.length;
        int columns = mat[0].length;
        int[] result = new int[rows * columns];
        int outputIndex = 0;

        for (int diagonal = 0; diagonal < rows + columns - 1; diagonal++) {
            int firstRow = Math.max(0, diagonal - columns + 1);
            int lastRow = Math.min(rows - 1, diagonal);
            if (diagonal % 2 == 0) {
                for (int row = lastRow; row >= firstRow; row--) {
                    result[outputIndex++] = mat[row][diagonal - row];
                }
            } else {
                for (int row = firstRow; row <= lastRow; row++) {
                    result[outputIndex++] = mat[row][diagonal - row];
                }
            }
        }

        return result;
    }
}
