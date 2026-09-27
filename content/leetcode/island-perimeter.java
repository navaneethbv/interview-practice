class Solution {
    public int islandPerimeter(int[][] grid) {
        int landCells = 0;
        int sharedEdges = 0;
        for (int row = 0; row < grid.length; row++) {
            for (int column = 0; column < grid[row].length; column++) {
                landCells += grid[row][column];
                if (column + 1 < grid[row].length
                        && grid[row][column] == 1 && grid[row][column + 1] == 1) {
                    sharedEdges++;
                }
                if (row + 1 < grid.length
                        && grid[row][column] == 1 && grid[row + 1][column] == 1) {
                    sharedEdges++;
                }
            }
        }
        return 4 * landCells - 2 * sharedEdges;
    }
}
