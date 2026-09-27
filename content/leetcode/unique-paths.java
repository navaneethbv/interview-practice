class Solution {
    public int uniquePaths(int m, int n) {
        int[] row = new int[n];
        Arrays.fill(row, 1);
        for (int rowIndex = 1; rowIndex < m; rowIndex++) {
            for (int column = 1; column < n; column++) {
                row[column] += row[column - 1];
            }
        }
        return row[n - 1];
    }
}
