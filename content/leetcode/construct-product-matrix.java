class Solution {
    public int[][] constructProductMatrix(int[][] grid) {
        int rows = grid.length;
        int columns = grid[0].length;
        int[][] answer = new int[rows][columns];
        long product = 1;
        for (int index = 0; index < rows * columns; index++) {
            int row = index / columns;
            int column = index % columns;
            answer[row][column] = (int) product;
            product = product * grid[row][column] % 12345;
        }
        product = 1;
        for (int index = rows * columns - 1; index >= 0; index--) {
            int row = index / columns;
            int column = index % columns;
            answer[row][column] = (int) (answer[row][column] * product % 12345);
            product = product * grid[row][column] % 12345;
        }
        return answer;
    }
}
