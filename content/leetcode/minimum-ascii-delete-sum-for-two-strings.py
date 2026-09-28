class Solution:
    def minimumDeleteSum(self, s1, s2):
        dp = [0]
        for character in s2:
            dp.append(dp[-1] + ord(character))
        for first in s1:
            previous_diagonal = dp[0]
            dp[0] += ord(first)
            for column, second in enumerate(s2, 1):
                old_value = dp[column]
                if first == second:
                    dp[column] = previous_diagonal
                else:
                    dp[column] = min(dp[column] + ord(first), dp[column - 1] + ord(second))
                previous_diagonal = old_value
        return dp[-1]
