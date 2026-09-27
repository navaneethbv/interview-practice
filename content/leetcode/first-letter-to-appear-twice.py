class Solution:
    def repeatedCharacter(self,s):
        seen=set()
        for ch in s:
            if ch in seen:return ch
            seen.add(ch)
