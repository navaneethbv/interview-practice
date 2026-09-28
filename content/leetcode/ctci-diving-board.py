class Solution:
    def allLengths(self, k, shorter, longer):
        if k == 0:
            return []
        if shorter == longer:
            return [k * shorter]
        return [shorter * (k - long_count) + longer * long_count for long_count in range(k + 1)]
