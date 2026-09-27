class Solution {
    public void solveSudoku(char[][] board) {
        boolean[][] usedInRows = new boolean[9][10];
        boolean[][] usedInColumns = new boolean[9][10];
        boolean[][] usedInBoxes = new boolean[9][10];
        for (int row = 0; row < 9; row++) {
            for (int column = 0; column < 9; column++) {
                char value = board[row][column];
                if (value != '.') {
                    mark(usedInRows, usedInColumns, usedInBoxes, row, column, value, true);
                }
            }
        }
        search(board, 0, usedInRows, usedInColumns, usedInBoxes);
    }

    private boolean search(char[][] board, int position, boolean[][] usedInRows,
                           boolean[][] usedInColumns, boolean[][] usedInBoxes) {
        if (position == 81) {
            return true;
        }
        int row = position / 9;
        int column = position % 9;
        if (board[row][column] != '.') {
            return search(board, position + 1, usedInRows, usedInColumns, usedInBoxes);
        }
        int box = boxIndex(row, column);
        for (char value = '1'; value <= '9'; value++) {
            int digit = value - '0';
            if (usedInRows[row][digit] || usedInColumns[column][digit]
                    || usedInBoxes[box][digit]) {
                continue;
            }
            board[row][column] = value;
            mark(usedInRows, usedInColumns, usedInBoxes, row, column, value, true);
            if (search(board, position + 1, usedInRows, usedInColumns, usedInBoxes)) {
                return true;
            }
            mark(usedInRows, usedInColumns, usedInBoxes, row, column, value, false);
            board[row][column] = '.';
        }
        return false;
    }

    private void mark(boolean[][] usedInRows, boolean[][] usedInColumns,
                      boolean[][] usedInBoxes, int row, int column, char value,
                      boolean used) {
        int digit = value - '0';
        usedInRows[row][digit] = used;
        usedInColumns[column][digit] = used;
        usedInBoxes[boxIndex(row, column)][digit] = used;
    }

    private int boxIndex(int row, int column) {
        return row / 3 * 3 + column / 3;
    }
}
