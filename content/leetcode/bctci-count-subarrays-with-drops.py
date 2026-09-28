class Solution:
    def countDrops(self, arr, k):
        total = len(arr) * (len(arr) + 1) // 2
        at_most = self._at_most(arr, k)
        below = self._at_most(arr, k - 1)
        return [at_most, at_most - below, total - below]

    def _at_most(self, arr, k):
        if k < 0:
            return 0
        left = drops = count = 0
        for right in range(len(arr)):
            if right > 0 and arr[right - 1] > arr[right]:
                drops += 1
            while drops > k:
                if arr[left] > arr[left + 1]:
                    drops -= 1
                left += 1
            count += right - left + 1
        return count
