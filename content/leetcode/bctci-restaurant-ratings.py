class Solution:
    def bestRatings(self, ratings):
        without_last, with_best = 0.0, 0.0
        for rating in ratings:
            without_last, with_best = with_best, max(with_best, without_last + rating)
        return with_best
