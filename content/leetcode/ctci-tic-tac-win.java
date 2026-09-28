class Solution {
    public String hasWon(String[] board) {
        int n = board.length;
        for (int i = 0; i < n; i++) {
            String rowWinner = winner(board, i, 0, 0, 1);
            if (!rowWinner.isEmpty()) {
                return rowWinner;
            }
            String columnWinner = winner(board, 0, i, 1, 0);
            if (!columnWinner.isEmpty()) {
                return columnWinner;
            }
        }
        String diagonal = winner(board, 0, 0, 1, 1);
        if (!diagonal.isEmpty()) {
            return diagonal;
        }
        return winner(board, 0, n - 1, 1, -1);
    }

    private String winner(String[] board, int row, int col, int rowStep, int colStep) {
        char first = board[row].charAt(col);
        if (first == ' ') {
            return "";
        }
        for (int step = 0; step < board.length; step++) {
            if (board[row + step * rowStep].charAt(col + step * colStep) != first) {
                return "";
            }
        }
        return String.valueOf(first);
    }
}
