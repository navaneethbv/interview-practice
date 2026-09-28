class Solution:
    def lexSmallestNegatedPerm(self, n, target):
        total = n * (n + 1) // 2
        if abs(target) > total or (total - target) % 2:
            return []
        remaining = (total - target) // 2
        negative = []
        positive = []
        for value in range(n, 0, -1):
            if value <= remaining:
                negative.append(-value)
                remaining -= value
            else:
                positive.append(value)
        return negative + positive[::-1]
