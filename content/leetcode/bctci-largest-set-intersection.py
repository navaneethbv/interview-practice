class Solution:
    def bestExclusion(self, sets):
        n = len(sets)
        if n == 1:
            return 0
        counts = {}
        for group in sets:
            for value in group:
                counts[value] = counts.get(value, 0) + 1
        everywhere = sum(1 for count in counts.values() if count == n)
        missing_one = sum(1 for count in counts.values() if count == n - 1)
        best_index, best_size = 0, -1
        for index, group in enumerate(sets):
            size = everywhere + missing_one - sum(1 for value in group if counts[value] == n - 1)
            if size > best_size:
                best_index, best_size = index, size
        return best_index
