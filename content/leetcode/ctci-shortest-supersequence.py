class Solution:
    def _include(self, counts, value):
        if value not in counts:
            return 0
        counts[value] += 1
        return int(counts[value] == 1)

    def _exclude(self, counts, value):
        if value not in counts:
            return 0
        counts[value] -= 1
        return int(counts[value] == 0)

    def shortestSeq(self, shorter, longer):
        counts = dict.fromkeys(shorter, 0)
        covered = 0
        best = [-1, -1]
        left = 0
        for right, value in enumerate(longer):
            covered += self._include(counts, value)
            while covered == len(counts):
                if best[0] == -1 or right - left < best[1] - best[0]:
                    best = [left, right]
                covered -= self._exclude(counts, longer[left])
                left += 1
        return best
