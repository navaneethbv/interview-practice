class Solution:
    def minOperations(self, s):
        if all(first <= second for first, second in zip(s, s[1:])):
            return 0
        if len(s) == 2:
            return -1
        smallest = min(s)
        largest = max(s)
        if s[0] == smallest or s[-1] == largest:
            return 1
        if smallest in s[1:-1] or largest in s[1:-1]:
            return 2
        return 3
