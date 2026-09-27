class Solution:
    def maxVowels(self, s, k):
        vowels=set('aeiou'); count=best=0
        for i,c in enumerate(s):
            count+=c in vowels
            if i>=k: count-=s[i-k] in vowels
            if i>=k-1: best=max(best,count)
        return best
