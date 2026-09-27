import bisect


class Solution:
    def medianSlidingWindow(self, nums, k):
        window = sorted(nums[:k])
        medians = []

        for right in range(k, len(nums) + 1):
            middle = k // 2
            if k % 2 == 1:
                medians.append(float(window[middle]))
            else:
                medians.append((window[middle - 1] + window[middle]) / 2)

            if right == len(nums):
                continue
            outgoing = nums[right - k]
            window.pop(bisect.bisect_left(window, outgoing))
            bisect.insort(window, nums[right])

        return medians
