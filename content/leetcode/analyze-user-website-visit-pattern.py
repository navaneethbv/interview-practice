class Solution:
    def mostVisitedPattern(self, username, timestamp, website):
        from collections import defaultdict,Counter
        from itertools import combinations
        visits = defaultdict(list)
        records = sorted(zip(timestamp, username, website))
        for _, user, site in records:
            visits[user].append(site)
        scores = Counter()
        for sites in visits.values():
            scores.update(set(combinations(sites, 3)))
        best_pattern = min(scores, key=lambda pattern: (-scores[pattern], pattern))
        return list(best_pattern)
