class Solution:
    def splitWordsBySeparator(self,words,separator):return [part for word in words for part in word.split(separator) if part]
