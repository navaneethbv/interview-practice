from collections import Counter


class Solution:
    def numIdenticalPairs(self, nums):
        answer = 0
        for count in Counter(nums).values():
            answer += count * (count - 1) // 2
        return answer
