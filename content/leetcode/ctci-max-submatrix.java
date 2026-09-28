class Solution {
    public int maxSubmatrixSum(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;
        int best = matrix[0][0];
        for (int top = 0; top < rows; top++) {
            int[] columnSums = new int[cols];
            for (int bottom = top; bottom < rows; bottom++) {
                for (int col = 0; col < cols; col++) {
                    columnSums[col] += matrix[bottom][col];
                }
                best = Math.max(best, kadane(columnSums));
            }
        }
        return best;
    }

    private int kadane(int[] values) {
        int best = values[0];
        int current = values[0];
        for (int i = 1; i < values.length; i++) {
            current = Math.max(values[i], current + values[i]);
            best = Math.max(best, current);
        }
        return best;
    }
}
