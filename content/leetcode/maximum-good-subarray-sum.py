class Solution:
    def maximumSubarraySum(self, nums, k):
        minimum_prefix = {}
        prefix = 0
        answer = None
        for value in nums:
            minimum_prefix[value] = min(minimum_prefix.get(value, prefix), prefix)
            prefix += value
            for endpoint in (value - k, value + k):
                if endpoint in minimum_prefix:
                    candidate = prefix - minimum_prefix[endpoint]
                    answer = candidate if answer is None else max(answer, candidate)
        return 0 if answer is None else answer
