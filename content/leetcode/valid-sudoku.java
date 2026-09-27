class Solution {
    public boolean isValidSudoku(char[][] board) {
        Set<String> seen = new HashSet<>();
        for (int row = 0; row < 9; row++) {
            if (!checkRow(board, row, seen)) {
                return false;
            }
        }
        return true;
    }

    private boolean checkRow(char[][] board, int row, Set<String> seen) {
        for (int column = 0; column < 9; column++) {
            char value = board[row][column];
            if (value == '.') {
                continue;
            }
            String rowKey = "row:" + row + ":" + value;
            String columnKey = "column:" + column + ":" + value;
            String boxKey = "box:" + row / 3 + ":" + column / 3 + ":" + value;
            if (!seen.add(rowKey) || !seen.add(columnKey) || !seen.add(boxKey)) {
                return false;
            }
        }
        return true;
    }
}
