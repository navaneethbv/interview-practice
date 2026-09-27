class Solution:
    def coinChange(self, coins, amount):
        dp = [0] + [amount+1]*amount
        for value in range(1, amount+1):
            for coin in coins:
                if coin <= value:
                    dp[value] = min(dp[value], dp[value-coin]+1)
        return dp[amount] if dp[amount] <= amount else -1
