from bisect import bisect_left
class Solution:
    def lengthOfLIS(self, nums):
        tails = []
        for value in nums:
            i = bisect_left(tails, value)
            if i == len(tails):
                tails.append(value)
            else:
                tails[i] = value
        return len(tails)
