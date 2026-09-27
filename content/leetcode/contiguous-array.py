class Solution:
    def findMaxLength(self, nums):
        first = {0:-1}
        balance = best = 0
        for i,value in enumerate(nums):
            balance += 1 if value else -1
            if balance in first:
                best = max(best,i-first[balance])
            else:
                first[balance] = i
        return best
