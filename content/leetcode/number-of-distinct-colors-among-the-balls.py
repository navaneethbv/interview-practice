from collections import Counter


class Solution:
    def queryResults(self, _limit, queries):
        balls = {}
        counts = Counter()
        result = []
        for ball, color in queries:
            if ball in balls:
                old_color = balls[ball]
                counts[old_color] -= 1
                if counts[old_color] == 0:
                    del counts[old_color]
            balls[ball] = color
            counts[color] += 1
            result.append(len(counts))
        return result
