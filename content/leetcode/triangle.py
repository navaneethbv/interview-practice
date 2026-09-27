class Solution:
    def minimumTotal(self, triangle):
        minimum_totals = triangle[-1][:]

        for row in reversed(triangle[:-1]):
            for index, value in enumerate(row):
                minimum_totals[index] = value + min(
                    minimum_totals[index], minimum_totals[index + 1]
                )

        return minimum_totals[0]
