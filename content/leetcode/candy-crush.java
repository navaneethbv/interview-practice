class Solution {
    public int[][] candyCrush(int[][] board) {
        while (true) {
            boolean[][] crushed = findCrushed(board);
            boolean changed = false;
            for (int row = 0; row < board.length; row++) {
                for (int column = 0; column < board[0].length; column++) {
                    if (crushed[row][column]) {
                        board[row][column] = 0;
                        changed = true;
                    }
                }
            }
            if (!changed) {
                return board;
            }
            dropCandies(board);
        }
    }

    private boolean[][] findCrushed(int[][] board) {
        int rows = board.length;
        int columns = board[0].length;
        boolean[][] crushed = new boolean[rows][columns];
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                int value = board[row][column];
                if (value == 0) {
                    continue;
                }
                if (column + 2 < columns && value == board[row][column + 1]
                        && value == board[row][column + 2]) {
                    crushed[row][column] = true;
                    crushed[row][column + 1] = true;
                    crushed[row][column + 2] = true;
                }
                if (row + 2 < rows && value == board[row + 1][column]
                        && value == board[row + 2][column]) {
                    crushed[row][column] = true;
                    crushed[row + 1][column] = true;
                    crushed[row + 2][column] = true;
                }
            }
        }
        return crushed;
    }

    private void dropCandies(int[][] board) {
        for (int column = 0; column < board[0].length; column++) {
            int writeRow = board.length - 1;
            for (int row = board.length - 1; row >= 0; row--) {
                if (board[row][column] != 0) {
                    board[writeRow][column] = board[row][column];
                    writeRow--;
                }
            }
            while (writeRow >= 0) {
                board[writeRow][column] = 0;
                writeRow--;
            }
        }
    }
}
