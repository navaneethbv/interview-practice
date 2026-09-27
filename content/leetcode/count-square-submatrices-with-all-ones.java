class Solution {
    public int countSquares(int[][] matrix) {
        int[] previous = new int[matrix[0].length + 1];
        int total = 0;
        for (int[] row : matrix) {
            int[] current = new int[previous.length];
            for (int column = 0; column < row.length; column++) {
                if (row[column] == 1) {
                    current[column + 1] = 1 + Math.min(
                            previous[column], Math.min(previous[column + 1], current[column]));
                    total += current[column + 1];
                }
            }
            previous = current;
        }
        return total;
    }
}
