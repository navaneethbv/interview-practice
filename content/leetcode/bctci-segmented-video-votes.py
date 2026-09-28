class Solution:
    def netVotes(self, n, votes):
        delta = [0] * (n + 1)
        for l, r, v in votes:
            delta[l] += v
            delta[r + 1] -= v
        result, running = [], 0
        for minute in range(n):
            running += delta[minute]
            result.append(running)
        return result
