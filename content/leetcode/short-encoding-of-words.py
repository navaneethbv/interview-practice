class Solution:
    def minimumLengthEncoding(self,words):
        keep=set(words)
        for word in words:
            for i in range(1,len(word)):keep.discard(word[i:])
        return sum(len(w)+1 for w in keep)
