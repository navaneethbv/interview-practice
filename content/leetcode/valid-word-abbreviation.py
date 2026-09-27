class Solution:
    def validWordAbbreviation(self, word, abbr):
        i=j=0
        while j<len(abbr):
            if abbr[j]=='0': return False
            if abbr[j].isdigit():
                count,j=self._number(abbr,j); i+=count
            elif i>=len(word) or word[i]!=abbr[j]:
                return False
            else:
                i+=1; j+=1
            if i>len(word): return False
        return i==len(word)

    @staticmethod
    def _number(abbr, j):
        """Reads the skip count starting at j; returns it and the index after it."""
        count=0
        while j<len(abbr) and abbr[j].isdigit(): count=count*10+int(abbr[j]); j+=1
        return count,j
