NEGATIVE = -10**15


class Solution:
    def maximumAmount(self, coins):
        rows = len(coins)
        columns = len(coins[0])
        dp = [[[NEGATIVE] * 3 for _ in range(columns)] for _ in range(rows)]
        for row in range(rows):
            for column in range(columns):
                for skipped in range(3):
                    self._enter_cell(coins, dp, row, column, skipped)
        return max(dp[-1][-1])

    def _enter_cell(self, coins, dp, row, column, skipped):
        previous = self._best_previous(dp, row, column, skipped)
        value = coins[row][column]
        dp[row][column][skipped] = max(
            dp[row][column][skipped], previous + value
        )
        if value < 0 and skipped < 2:
            dp[row][column][skipped + 1] = max(
                dp[row][column][skipped + 1], previous
            )

    def _best_previous(self, dp, row, column, skipped):
        if row == 0 and column == 0:
            return 0 if skipped == 0 else NEGATIVE
        best = NEGATIVE
        if row > 0:
            best = max(best, dp[row - 1][column][skipped])
        if column > 0:
            best = max(best, dp[row][column - 1][skipped])
        return best
