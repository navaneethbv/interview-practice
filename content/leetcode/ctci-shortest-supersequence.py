class Solution:
    def shortestSeq(self, shorter, longer):
        needed = set(shorter)
        counts = {}
        covered = 0
        best = [-1, -1]
        left = 0
        for right, value in enumerate(longer):
            if value in needed:
                counts[value] = counts.get(value, 0) + 1
                covered += int(counts[value] == 1)
            while covered == len(needed):
                if best[0] == -1 or right - left < best[1] - best[0]:
                    best = [left, right]
                outgoing = longer[left]
                if outgoing in needed:
                    counts[outgoing] -= 1
                    covered -= int(counts[outgoing] == 0)
                left += 1
        return best
