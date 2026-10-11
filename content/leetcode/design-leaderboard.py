import heapq


class Leaderboard:
    def __init__(self):
        self.scores = {}

    def addScore(self, playerId, score):
        self.scores[playerId] = self.scores.get(playerId, 0) + score

    def top(self, K):
        return sum(heapq.nlargest(K, self.scores.values()))

    def reset(self, playerId):
        del self.scores[playerId]
