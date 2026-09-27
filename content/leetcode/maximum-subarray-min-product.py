class Solution:
    def maxSumMinProduct(self, nums):
        prefix = [0]
        for value in nums:
            prefix.append(prefix[-1] + value)
        stack = []
        answer = 0
        for right in range(len(nums) + 1):
            while stack and (right == len(nums) or nums[stack[-1]] >= nums[right]):
                middle = stack.pop()
                left = stack[-1] + 1 if stack else 0
                total = prefix[right] - prefix[left]
                answer = max(answer, nums[middle] * total)
            stack.append(right)
        return answer % 1000000007
