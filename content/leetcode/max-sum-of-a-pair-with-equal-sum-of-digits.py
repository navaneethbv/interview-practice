class Solution:
    def maximumSum(self, nums):
        best_for_sum = {}
        answer = -1
        for x in nums:
            key = sum(map(int, str(x)))
            if key in best_for_sum:
                answer = max(answer, best_for_sum[key] + x)
            best_for_sum[key] = max(best_for_sum.get(key, 0), x)
        return answer
