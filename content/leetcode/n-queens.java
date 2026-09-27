class Solution {
    private void placeQueens(
            int n,
            int row,
            boolean[] usedColumns,
            boolean[] usedDownDiagonals,
            boolean[] usedUpDiagonals,
            List<String> board,
            List<List<String>> result) {
        if (row == n) {
            result.add(new ArrayList<>(board));
            return;
        }

        for (int column = 0; column < n; column++) {
            int downDiagonal = row - column + n;
            int upDiagonal = row + column;
            if (usedColumns[column]
                    || usedDownDiagonals[downDiagonal]
                    || usedUpDiagonals[upDiagonal]) {
                continue;
            }

            usedColumns[column] = true;
            usedDownDiagonals[downDiagonal] = true;
            usedUpDiagonals[upDiagonal] = true;
            board.add(buildRow(n, column));

            placeQueens(
                    n,
                    row + 1,
                    usedColumns,
                    usedDownDiagonals,
                    usedUpDiagonals,
                    board,
                    result);

            board.remove(board.size() - 1);
            usedColumns[column] = false;
            usedDownDiagonals[downDiagonal] = false;
            usedUpDiagonals[upDiagonal] = false;
        }
    }

    private String buildRow(int n, int queenColumn) {
        char[] row = new char[n];
        Arrays.fill(row, '.');
        row[queenColumn] = 'Q';
        return new String(row);
    }

    public List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        placeQueens(
                n,
                0,
                new boolean[n],
                new boolean[2 * n + 1],
                new boolean[2 * n + 1],
                new ArrayList<>(),
                result);
        return result;
    }
}
