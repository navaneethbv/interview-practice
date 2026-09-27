from collections import Counter
class Solution:
    def removeDuplicateLetters(self, s):
        remaining=Counter(s);stack=[];used=set()
        for c in s:
            remaining[c]-=1
            if c in used:continue
            while stack and stack[-1]>c and remaining[stack[-1]]:used.remove(stack.pop())
            stack.append(c);used.add(c)
        return ''.join(stack)
