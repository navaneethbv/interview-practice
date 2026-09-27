class Solution {
    public int countBattleships(char[][] board) {
        int shipCount = 0;

        for (int row = 0; row < board.length; row++) {
            for (int column = 0; column < board[0].length; column++) {
                if (board[row][column] != 'X') {
                    continue;
                }
                boolean hasShipAbove = row > 0 && board[row - 1][column] == 'X';
                boolean hasShipLeft = column > 0 && board[row][column - 1] == 'X';
                if (!hasShipAbove && !hasShipLeft) {
                    shipCount++;
                }
            }
        }

        return shipCount;
    }
}
