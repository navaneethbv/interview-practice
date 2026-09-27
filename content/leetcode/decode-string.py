class Solution:
    def decodeString(self, s):
        stack=[];current='';number=0
        for c in s:
            if c.isdigit():number=number*10+int(c)
            elif c=='[':stack.append((current,number));current='';number=0
            elif c==']':prefix,count=stack.pop();current=prefix+current*count
            else:current+=c
        return current
