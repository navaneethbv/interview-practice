class Solution {
    private static final int[][] KNIGHT = {{-2, -1}, {-2, 1}, {-1, -2}, {-1, 2}, {1, -2}, {1, 2}, {2, -1}, {2, 1}};

    public List<List<Integer>> chessMoves(int[][] board, String piece, int r, int c) {
        List<List<Integer>> moves = new ArrayList<>();
        if (piece.equals("knight")) {
            for (int[] jump : KNIGHT) {
                addIfFree(board, r + jump[0], c + jump[1], moves);
            }
            return moves;
        }
        boolean slides = piece.equals("queen");
        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                if (dr == 0 && dc == 0) {
                    continue;
                }
                int row = r + dr;
                int col = c + dc;
                while (addIfFree(board, row, col, moves) && slides) {
                    row += dr;
                    col += dc;
                }
            }
        }
        return moves;
    }

    private boolean addIfFree(int[][] board, int row, int col, List<List<Integer>> moves) {
        int n = board.length;
        if (row < 0 || row >= n || col < 0 || col >= n || board[row][col] != 0) {
            return false;
        }
        moves.add(List.of(row, col));
        return true;
    }
}
