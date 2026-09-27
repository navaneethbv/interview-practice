from collections import Counter


class Solution:
    def leastInterval(self, tasks, n):
        counts = Counter(tasks)
        maximum = max(counts.values())
        tied = sum(count == maximum for count in counts.values())
        minimum_length = (maximum - 1) * (n + 1) + tied
        return max(len(tasks), minimum_length)
