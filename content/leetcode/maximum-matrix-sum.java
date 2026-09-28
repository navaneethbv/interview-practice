class Solution {
    public long maxMatrixSum(int[][] matrix) {
        long total = 0;
        int negativeCount = 0;
        int minimumMagnitude = Integer.MAX_VALUE;
        for (int[] row : matrix) {
            for (int value : row) {
                total += Math.abs(value);
                minimumMagnitude = Math.min(minimumMagnitude, Math.abs(value));
                if (value < 0) {
                    negativeCount++;
                }
            }
        }
        if (negativeCount % 2 == 0) {
            return total;
        }
        return total - 2L * minimumMagnitude;
    }
}
