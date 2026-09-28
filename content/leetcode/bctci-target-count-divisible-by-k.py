from bisect import bisect_left, bisect_right


class Solution:
    def countDivisible(self, arr, target, k):
        count = bisect_right(arr, target) - bisect_left(arr, target)
        return count % k == 0
