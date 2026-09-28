class Solution:
    def closestToRiver(self, field):
        row = next(r for r in range(len(field)) if field[r][0] == 1)
        closest = row
        for col in range(1, len(field[0])):
            for candidate in (row - 1, row, row + 1):
                if 0 <= candidate < len(field) and field[candidate][col] == 1:
                    row = candidate
                    break
            closest = min(closest, row)
        return closest
