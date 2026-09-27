class Solution:
    def wordPatternMatch(self,pattern,s):
        mapping={};used=set()
        def search(i,j):
            if i==len(pattern):return j==len(s)
            if len(s)-j<len(pattern)-i:return False
            ch=pattern[i]
            if ch in mapping:
                value=mapping[ch]
                return s.startswith(value,j) and search(i+1,j+len(value))
            for end in range(j+1,len(s)+1):
                value=s[j:end]
                if value in used:continue
                mapping[ch]=value;used.add(value)
                if search(i+1,end):return True
                del mapping[ch];used.remove(value)
            return False
        return search(0,0)
