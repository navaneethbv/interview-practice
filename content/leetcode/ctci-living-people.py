class Solution:
    FIRST_YEAR = 1900
    LAST_YEAR = 2000

    def maxAliveYear(self, birth, death):
        deltas = [0] * (self.LAST_YEAR - self.FIRST_YEAR + 2)
        for born, died in zip(birth, death):
            deltas[born - self.FIRST_YEAR] += 1
            deltas[died - self.FIRST_YEAR + 1] -= 1
        alive = best = 0
        best_year = self.FIRST_YEAR
        for offset in range(self.LAST_YEAR - self.FIRST_YEAR + 1):
            alive += deltas[offset]
            if alive > best:
                best = alive
                best_year = self.FIRST_YEAR + offset
        return best_year
