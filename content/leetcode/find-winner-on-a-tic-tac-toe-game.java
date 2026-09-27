class Solution {
    public String tictactoe(int[][] moves) {
        int[] rows = new int[3];
        int[] columns = new int[3];
        int diagonal = 0;
        int antiDiagonal = 0;
        for (int index = 0; index < moves.length; index++) {
            int row = moves[index][0];
            int column = moves[index][1];
            int mark = index % 2 == 0 ? 1 : -1;
            rows[row] += mark;
            columns[column] += mark;
            if (row == column) {
                diagonal += mark;
            }
            if (row + column == 2) {
                antiDiagonal += mark;
            }
            if (hasWinner(rows[row], columns[column], diagonal, antiDiagonal)) {
                return mark == 1 ? "A" : "B";
            }
        }
        return moves.length == 9 ? "Draw" : "Pending";
    }

    private boolean hasWinner(int row, int column, int diagonal, int antiDiagonal) {
        return Math.abs(row) == 3 || Math.abs(column) == 3
                || Math.abs(diagonal) == 3 || Math.abs(antiDiagonal) == 3;
    }
}
