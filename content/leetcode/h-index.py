class Solution:
    def hIndex(self, citations):
        best = 0
        for rank, citation_count in enumerate(sorted(citations, reverse=True), 1):
            if citation_count >= rank:
                best = rank
        return best
