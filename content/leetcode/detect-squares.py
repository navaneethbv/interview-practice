from collections import Counter
class DetectSquares:
    def __init__(self):
        self.points = Counter()

    def add(self, point):
        self.points[tuple(point)] += 1

    def count(self, point):
        x,y = point
        answer = 0
        for (a,b), copies in self.points.items():
            if a != x and abs(a-x) == abs(b-y):
                answer += copies*self.points[(a,y)]*self.points[(x,b)]
        return answer
