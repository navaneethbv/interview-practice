class Solution {
    public int[][] queensReach(int[][] board) {
        int n = board.length;
        int[][] unsafe = new int[n][];
        for (int r = 0; r < n; r++) {
            unsafe[r] = board[r].clone();
        }
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == 1) {
                    markAttacks(board, unsafe, r, c);
                }
            }
        }
        return unsafe;
    }

    private void markAttacks(int[][] board, int[][] unsafe, int r, int c) {
        int n = board.length;
        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                if (dr == 0 && dc == 0) {
                    continue;
                }
                int row = r + dr;
                int col = c + dc;
                while (row >= 0 && row < n && col >= 0 && col < n && board[row][col] == 0) {
                    unsafe[row][col] = 1;
                    row += dr;
                    col += dc;
                }
            }
        }
    }
}
