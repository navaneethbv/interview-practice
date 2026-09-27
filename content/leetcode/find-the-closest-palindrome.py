class Solution:
    def nearestPalindromic(self, n):
        length = len(n)
        value = int(n)
        prefix = int(n[: (length + 1) // 2])
        candidates = {10 ** (length - 1) - 1, 10**length + 1}
        for candidate_prefix in (prefix - 1, prefix, prefix + 1):
            if candidate_prefix < 0:
                continue
            left = str(candidate_prefix)
            right = left[: length // 2][::-1]
            candidates.add(int(left + right))
        candidates.discard(value)
        return str(min(candidates, key=lambda candidate: (abs(candidate - value), candidate)))
