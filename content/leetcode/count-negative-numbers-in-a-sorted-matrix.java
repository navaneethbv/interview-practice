class Solution {
    public int countNegatives(int[][] grid) {
        int column = grid[0].length - 1;
        int total = 0;
        for (int[] row : grid) {
            while (column >= 0 && row[column] < 0) {
                column--;
            }
            total += row.length - column - 1;
        }
        return total;
    }
}
