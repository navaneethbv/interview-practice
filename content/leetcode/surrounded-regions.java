class Solution {
    private void markSafeCells(char[][] board, Deque<int[]> queue) {
        int rows = board.length;
        int columns = board[0].length;

        while (!queue.isEmpty()) {
            int[] cell = queue.remove();
            int row = cell[0];
            int column = cell[1];

            addSafeCell(board, queue, row - 1, column);
            addSafeCell(board, queue, row + 1, column);
            addSafeCell(board, queue, row, column - 1);
            addSafeCell(board, queue, row, column + 1);
        }
    }

    private void addSafeCell(
            char[][] board,
            Deque<int[]> queue,
            int row,
            int column) {
        if (row >= 0
                && row < board.length
                && column >= 0
                && column < board[0].length
                && board[row][column] == 'O') {
            board[row][column] = '#';
            queue.add(new int[]{row, column});
        }
    }

    public void solve(char[][] board) {
        if (board.length == 0 || board[0].length == 0) {
            return;
        }

        Deque<int[]> queue = new ArrayDeque<>();
        for (int row = 0; row < board.length; row++) {
            addBoundaryCell(board, queue, row, 0);
            addBoundaryCell(board, queue, row, board[0].length - 1);
        }
        for (int column = 0; column < board[0].length; column++) {
            addBoundaryCell(board, queue, 0, column);
            addBoundaryCell(board, queue, board.length - 1, column);
        }

        markSafeCells(board, queue);
        for (int row = 0; row < board.length; row++) {
            for (int column = 0; column < board[0].length; column++) {
                board[row][column] = board[row][column] == '#' ? 'O' : 'X';
            }
        }
    }

    private void addBoundaryCell(
            char[][] board,
            Deque<int[]> queue,
            int row,
            int column) {
        if (board[row][column] == 'O') {
            board[row][column] = '#';
            queue.add(new int[]{row, column});
        }
    }
}
