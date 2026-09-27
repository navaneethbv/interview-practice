class Solution:
    def nextGreaterElement(self, n):
        digits=list(str(n)); pivot=len(digits)-2
        while pivot>=0 and digits[pivot]>=digits[pivot+1]: pivot-=1
        if pivot<0: return -1
        swap=len(digits)-1
        while digits[swap]<=digits[pivot]: swap-=1
        digits[pivot],digits[swap]=digits[swap],digits[pivot]; digits[pivot+1:]=reversed(digits[pivot+1:])
        value=int(''.join(digits))
        return value if value<=2147483647 else -1
