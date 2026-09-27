class Solution:
    def calculateMinimumHP(self, dungeon):
        rows = len(dungeon)
        columns = len(dungeon[0])
        minimum_health = [float("inf")] * (columns + 1)
        minimum_health[columns - 1] = 1
        for row in range(rows - 1, -1, -1):
            for column in range(columns - 1, -1, -1):
                needed_after_cell = min(minimum_health[column], minimum_health[column + 1])
                minimum_health[column] = max(1, needed_after_cell - dungeon[row][column])
        return minimum_health[0]
