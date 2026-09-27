class Solution {
    public char[][] updateBoard(char[][] board, int[] click) {
        int row = click[0];
        int column = click[1];
        if (board[row][column] == 'M') {
            board[row][column] = 'X';
            return board;
        }

        Deque<int[]> queue = new ArrayDeque<>();
        queue.add(new int[]{row, column});
        board[row][column] = 'B';

        while (!queue.isEmpty()) {
            int[] cell = queue.remove();
            int mineCount = countMines(board, cell[0], cell[1]);
            if (mineCount > 0) {
                board[cell[0]][cell[1]] = (char) ('0' + mineCount);
                continue;
            }

            enqueueNeighbors(board, queue, cell);
        }

        return board;
    }

    private void enqueueNeighbors(char[][] board, Deque<int[]> queue, int[] cell) {
        for (int nextRow = cell[0] - 1; nextRow <= cell[0] + 1; nextRow++) {
            for (int nextColumn = cell[1] - 1;
                    nextColumn <= cell[1] + 1;
                    nextColumn++) {
                if (nextRow == cell[0] && nextColumn == cell[1]) {
                    continue;
                }
                if (isInside(board, nextRow, nextColumn)
                        && board[nextRow][nextColumn] == 'E') {
                    board[nextRow][nextColumn] = 'B';
                    queue.add(new int[]{nextRow, nextColumn});
                }
            }
        }
    }

    private int countMines(char[][] board, int row, int column) {
        int count = 0;
        for (int nextRow = row - 1; nextRow <= row + 1; nextRow++) {
            for (int nextColumn = column - 1;
                    nextColumn <= column + 1;
                    nextColumn++) {
                if (isInside(board, nextRow, nextColumn)
                        && board[nextRow][nextColumn] == 'M') {
                    count++;
                }
            }
        }
        return count;
    }

    private boolean isInside(char[][] board, int row, int column) {
        return row >= 0
                && row < board.length
                && column >= 0
                && column < board[0].length;
    }
}
