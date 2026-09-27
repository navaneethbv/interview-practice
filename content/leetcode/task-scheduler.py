from collections import Counter
class Solution:
    def leastInterval(self, tasks, n):
        counts = Counter(tasks); maximum = max(counts.values())
        tied = sum(count == maximum for count in counts.values())
        return max(len(tasks),(maximum-1)*(n+1)+tied)
