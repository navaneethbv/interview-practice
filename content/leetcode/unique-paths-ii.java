class Solution {
public int uniquePathsWithObstacles(int[][] obstacleGrid) {
    int[] paths = new int[obstacleGrid[0].length];
    paths[0] = 1;
    for (int[] row : obstacleGrid) {
        for (int column = 0; column < row.length; column++) {
            if (row[column] == 1) {
                paths[column] = 0;
            } else if (column > 0) {
                paths[column] += paths[column - 1];
            }
        }
    }
    return paths[paths.length - 1];
}
}
