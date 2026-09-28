class Solution:
    def sparseSearch(self, words, target):
        low, high = 0, len(words) - 1
        while low <= high:
            mid = self._nearest_word(words, (low + high) // 2, low, high)
            if mid == -1:
                return -1
            if words[mid] == target:
                return mid
            if words[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return -1

    def _nearest_word(self, words, mid, low, high):
        left, right = mid, mid + 1
        while left >= low or right <= high:
            if left >= low and words[left]:
                return left
            if right <= high and words[right]:
                return right
            left -= 1
            right += 1
        return -1
