class Solution:
    def sumSubarrayMins(self, arr):
        stack = []
        total = 0
        for right in range(len(arr) + 1):
            while stack and (right == len(arr) or arr[stack[-1]] >= arr[right]):
                middle = stack.pop()
                left = stack[-1] if stack else -1
                total += arr[middle] * (middle - left) * (right - middle)
            if right < len(arr):
                stack.append(right)
        return total%1000000007
