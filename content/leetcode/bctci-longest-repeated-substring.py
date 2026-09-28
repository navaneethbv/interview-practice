class Solution:
    def longestRepeated(self, s):
        low, high = 1, len(s) - 1
        best = ""
        while low <= high:
            length = (low + high) // 2
            found = self._repeat(s, length)
            if found is None:
                high = length - 1
            else:
                best = found
                low = length + 1
        return best

    def _repeat(self, s, length):
        seen = {}
        best_start = None
        for start in range(len(s) - length + 1):
            window = s[start:start + length]
            if window in seen:
                first = seen[window]
                if best_start is None or first < best_start:
                    best_start = first
            else:
                seen[window] = start
        return None if best_start is None else s[best_start:best_start + length]
