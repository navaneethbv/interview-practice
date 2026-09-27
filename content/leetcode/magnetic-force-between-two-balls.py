class Solution:
    def maxDistance(self, position, m):
        positions = sorted(position)

        def possible(gap):
            used = 1
            last = positions[0]
            for index in range(1, len(positions)):
                if positions[index] - last >= gap:
                    used += 1
                    last = positions[index]
            return used >= m

        left = 1
        right = positions[-1] - positions[0]
        while left < right:
            middle = (left + right + 1) // 2
            if possible(middle):
                left = middle
            else:
                right = middle - 1
        return left
