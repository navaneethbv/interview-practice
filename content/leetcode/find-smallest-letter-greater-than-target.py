from bisect import bisect_right


class Solution:
    def nextGreatestLetter(self, letters, target):
        first_greater = bisect_right(letters, target)
        return letters[first_greater % len(letters)]
