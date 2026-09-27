class Solution:
    def mostVisitedPattern(self, username, timestamp, website):
        from collections import defaultdict,Counter
        from itertools import combinations
        visits=defaultdict(list)
        for time,user,site in sorted(zip(timestamp,username,website)): visits[user].append(site)
        scores=Counter()
        for sites in visits.values(): scores.update(set(combinations(sites,3)))
        return list(min(scores,key=lambda pattern:(-scores[pattern],pattern)))
