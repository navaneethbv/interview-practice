class Solution:
    def rocAuc(self, scores, labels):
        # Rank-sum (Mann-Whitney U) form: sort once, give tied scores their average rank.
        order = sorted(range(len(scores)), key=lambda i: scores[i])
        ranks = [0.0] * len(scores)
        i = 0
        while i < len(order):
            j = i
            while j + 1 < len(order) and scores[order[j + 1]] == scores[order[i]]:
                j += 1
            for t in range(i, j + 1):
                ranks[order[t]] = (i + j) / 2 + 1
            i = j + 1
        positives = sum(labels)
        negatives = len(labels) - positives
        rank_sum = sum(r for r, label in zip(ranks, labels) if label == 1)
        return (rank_sum - positives * (positives + 1) / 2) / (positives * negatives)
