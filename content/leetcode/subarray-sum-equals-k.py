from collections import Counter
class Solution:
    def subarraySum(self, nums, k):
        counts = Counter({0: 1})
        running_sum = 0
        answer = 0
        for value in nums:
            running_sum += value
            answer += counts[running_sum - k]
            counts[running_sum] += 1
        return answer
