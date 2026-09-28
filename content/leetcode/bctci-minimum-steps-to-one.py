class Solution:
    def minSteps(self, n):
        steps = [0] * (n + 1)
        for value in range(2, n + 1):
            best = steps[value - 1]
            if value % 2 == 0:
                best = min(best, steps[value // 2])
            if value % 3 == 0:
                best = min(best, steps[value // 3])
            steps[value] = best + 1
        return steps[n]
