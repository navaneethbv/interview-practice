class Solution {
    public int maxSumSubmatrix(int[][] matrix, int k) {
        int rows = matrix.length;
        int columns = matrix[0].length;
        int best = Integer.MIN_VALUE;
        for (int top = 0; top < rows; top++) {
            int[] columnSums = new int[columns];
            for (int bottom = top; bottom < rows; bottom++) {
                addRow(columnSums, matrix[bottom]);
                best = Math.max(best, bestForStrip(columnSums, k));
            }
        }
        return best;
    }

    private void addRow(int[] columnSums, int[] row) {
        for (int column = 0; column < row.length; column++) {
            columnSums[column] += row[column];
        }
    }

    private int bestForStrip(int[] columnSums, int k) {
        TreeSet<Integer> seen = new TreeSet<>();
        seen.add(0);
        int prefix = 0;
        int best = Integer.MIN_VALUE;
        for (int value : columnSums) {
            prefix += value;
            Integer previous = seen.ceiling(prefix - k);
            if (previous != null) {
                best = Math.max(best, prefix - previous);
            }
            seen.add(prefix);
        }
        return best;
    }
}
