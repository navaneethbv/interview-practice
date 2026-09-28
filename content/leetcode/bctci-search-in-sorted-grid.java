class Solution {
    public int[] searchGrid(int[][] grid, int target) {
        int cols = grid[0].length;
        long low = 0;
        long high = (long) grid.length * cols - 1;
        while (low <= high) {
            long mid = (low + high) / 2;
            int row = (int) (mid / cols);
            int col = (int) (mid % cols);
            if (grid[row][col] == target) {
                return new int[] {row, col};
            }
            if (grid[row][col] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return new int[] {-1, -1};
    }
}
