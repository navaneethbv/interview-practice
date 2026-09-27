class Solution:
    def wordPattern(self,pattern,s):
        words=s.split();forward={};backward={}
        if len(words)!=len(pattern):return False
        for ch,word in zip(pattern,words):
            if ch in forward and forward[ch]!=word:return False
            if word in backward and backward[word]!=ch:return False
            forward[ch]=word;backward[word]=ch
        return True
