class Solution:
    def minRemoveToMakeValid(self, s):
        opening=[];remove=set()
        for i,c in enumerate(s):
            if c=='(':opening.append(i)
            elif c==')':
                if opening:opening.pop()
                else:remove.add(i)
        remove.update(opening)
        return ''.join(c for i,c in enumerate(s) if i not in remove)
