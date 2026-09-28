class Solution:
    def findLongestSubarray(self, array):
        first_seen = {0: -1}
        balance = 0
        best_start, best_length = 0, 0
        for index, item in enumerate(array):
            balance += 1 if item.isalpha() else -1
            if balance not in first_seen:
                first_seen[balance] = index
                continue
            length = index - first_seen[balance]
            if length > best_length:
                best_start, best_length = first_seen[balance] + 1, length
        return array[best_start:best_start + best_length]
