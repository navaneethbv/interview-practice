from collections import Counter
class Solution:
    def closeStrings(self,word1,word2):
        a,b=Counter(word1),Counter(word2)
        return a.keys()==b.keys() and sorted(a.values())==sorted(b.values())
