class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        double[] row = {poured};
        for (int currentRow = 0; currentRow < query_row; currentRow++) {
            double[] nextRow = new double[row.length + 1];
            for (int index = 0; index < row.length; index++) {
                double overflow = Math.max(0, (row[index] - 1) / 2);
                nextRow[index] += overflow;
                nextRow[index + 1] += overflow;
            }
            row = nextRow;
        }
        return Math.min(1, row[query_glass]);
    }
}
