class Solution {
    public boolean exist(char[][] board, String word) {
        if (word.length() > board.length * board[0].length) {
            return false;
        }
        boolean[][] seen = new boolean[board.length][board[0].length];
        for (int row = 0; row < board.length; row++) {
            for (int column = 0; column < board[0].length; column++) {
                if (search(board, word, row, column, 0, seen)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean search(char[][] board, String word, int row, int column, int index, boolean[][] seen) {
        if (row < 0 || row >= board.length || column < 0 || column >= board[0].length) {
            return false;
        }
        if (seen[row][column] || board[row][column] != word.charAt(index)) {
            return false;
        }
        if (index == word.length() - 1) {
            return true;
        }
        seen[row][column] = true;
        boolean found = search(board, word, row - 1, column, index + 1, seen)
            || search(board, word, row + 1, column, index + 1, seen)
            || search(board, word, row, column - 1, index + 1, seen)
            || search(board, word, row, column + 1, index + 1, seen);
        seen[row][column] = false;
        return found;
    }
}
