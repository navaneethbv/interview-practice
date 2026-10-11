class Solution:
    def precisionRecallAtK(self, ranked, relevant, k):
        wanted = set(relevant)
        hits = sum(1 for item in ranked[:k] if item in wanted)
        return [hits / k, hits / len(wanted)]
