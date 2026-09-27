class TicTacToe {
    private final int size;
    private final int[] rows;
    private final int[] columns;
    private int diagonal;
    private int antiDiagonal;

    public TicTacToe(int n) {
        size = n;
        rows = new int[n];
        columns = new int[n];
    }

    public int move(int row, int col, int player) {
        int mark = player == 1 ? 1 : -1;
        rows[row] += mark;
        columns[col] += mark;

        if (row == col) {
            diagonal += mark;
        }
        if (row + col == size - 1) {
            antiDiagonal += mark;
        }

        boolean hasLine = Math.abs(rows[row]) == size
                || Math.abs(columns[col]) == size
                || Math.abs(diagonal) == size
                || Math.abs(antiDiagonal) == size;
        return hasLine ? player : 0;
    }
}
