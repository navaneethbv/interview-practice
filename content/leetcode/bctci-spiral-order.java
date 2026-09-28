class Solution {
    private static final int[][] DIRECTIONS = {{1, 0}, {0, -1}, {-1, 0}, {0, 1}};

    public int[][] spiralOrder(int n) {
        int[][] grid = new int[n][n];
        int row = n / 2;
        int col = n / 2;
        int value = 1;
        int leg = 1;
        int direction = 0;
        while (value < n * n) {
            for (int turn = 0; turn < 2 && value < n * n; turn++) {
                for (int step = 0; step < leg && value < n * n; step++) {
                    row += DIRECTIONS[direction][0];
                    col += DIRECTIONS[direction][1];
                    grid[row][col] = value++;
                }
                direction = (direction + 1) % 4;
            }
            leg++;
        }
        return grid;
    }
}
