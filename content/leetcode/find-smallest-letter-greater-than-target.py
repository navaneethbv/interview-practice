from bisect import bisect_right
class Solution:
    def nextGreatestLetter(self,letters,target):return letters[bisect_right(letters,target)%len(letters)]
