class Solution {
    public void gameOfLife(int[][] board) {
        int rows = board.length;
        int columns = board[0].length;
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                int liveNeighbors = countLiveNeighbors(board, row, column);
                int alive = board[row][column] & 1;
                if (liveNeighbors == 3 || (alive == 1 && liveNeighbors == 2)) {
                    board[row][column] |= 2;
                }
            }
        }
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                board[row][column] >>= 1;
            }
        }
    }

    private int countLiveNeighbors(int[][] board, int row, int column) {
        int total = 0;
        for (int nextRow = Math.max(0, row - 1); nextRow < Math.min(board.length, row + 2); nextRow++) {
            for (int nextColumn = Math.max(0, column - 1); nextColumn < Math.min(board[0].length, column + 2); nextColumn++) {
                if (nextRow != row || nextColumn != column) {
                    total += board[nextRow][nextColumn] & 1;
                }
            }
        }
        return total;
    }
}
