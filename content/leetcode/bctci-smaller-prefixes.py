class Solution:
    def smallerPrefixes(self, arr):
        slow_sum = fast_sum = 0
        fast = 0
        for slow in range(len(arr) // 2):
            slow_sum += arr[slow]
            fast_sum += arr[fast] + arr[fast + 1]
            fast += 2
            if slow_sum >= fast_sum:
                return False
        return True
