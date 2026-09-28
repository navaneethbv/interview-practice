from collections import Counter

class Solution:

    def leastBricks(self, wall):
        counts = Counter()
        for row in wall:
            position = 0
            for width in row[:-1]:
                position += width
                counts[position] += 1
        return len(wall) - max(counts.values(), default=0)
