class Solution:
    def periodViews(self, views, periods):
        prefix = [0]
        for count in views:
            prefix.append(prefix[-1] + count)
        return [prefix[r + 1] - prefix[l] for l, r in periods]
