from collections import Counter


class Solution:
    def pairSums(self, nums, target):
        counts = Counter(nums)
        pairs = []
        for value in sorted(counts):
            complement = target - value
            if complement < value:
                continue
            if complement == value:
                matches = counts[value] // 2
            else:
                matches = min(counts[value], counts.get(complement, 0))
            pairs.extend([value, complement] for _ in range(matches))
        return pairs
