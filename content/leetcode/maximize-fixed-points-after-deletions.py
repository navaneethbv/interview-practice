class Solution:

    def maxFixedPoints(self, nums):
        points = sorted(((v, i - v) for i, v in enumerate(nums) if v <= i))
        bit = [0] * (len(nums) + 1)
        ans = 0
        i = 0
        while i < len(points):
            j = i
            updates = []
            while j < len(points) and points[j][0] == points[i][0]:
                d = points[j][1]
                p = d + 1
                best = 0
                while p:
                    best = max(best, bit[p])
                    p -= p & -p
                updates.append((d + 1, best + 1))
                ans = max(ans, best + 1)
                j += 1
            for p, v in updates:
                while p < len(bit):
                    bit[p] = max(bit[p], v)
                    p += p & -p
            i = j
        return ans
