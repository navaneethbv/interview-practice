class Solution:
    def validWordAbbreviation(self, word, abbr):
        i=j=0
        while j<len(abbr):
            if abbr[j].isdigit():
                if abbr[j]=='0': return False
                count=0
                while j<len(abbr) and abbr[j].isdigit(): count=count*10+int(abbr[j]); j+=1
                i+=count
            else:
                if i>=len(word) or word[i]!=abbr[j]: return False
                i+=1; j+=1
            if i>len(word): return False
        return i==len(word)
