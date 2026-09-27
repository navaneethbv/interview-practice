class Solution:
    def countBattleships(self, board):
        ship_count = 0

        for row in range(len(board)):
            for column in range(len(board[0])):
                if board[row][column] != "X":
                    continue
                has_ship_above = row > 0 and board[row - 1][column] == "X"
                has_ship_left = column > 0 and board[row][column - 1] == "X"
                if not has_ship_above and not has_ship_left:
                    ship_count += 1

        return ship_count
