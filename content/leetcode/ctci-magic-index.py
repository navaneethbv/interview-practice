class Solution:
    def magicIndex(self, A):
        return self._search(A, 0, len(A) - 1)

    def _search(self, A, start, end):
        if start > end:
            return -1
        mid = (start + end) // 2
        left = self._search(A, start, min(mid - 1, A[mid]))
        if left != -1:
            return left
        if A[mid] == mid:
            return mid
        return self._search(A, max(mid + 1, A[mid]), end)
