class Solution:
    def maximumSwap(self, num):
        digits=list(str(num));last={c:i for i,c in enumerate(digits)}
        for i,c in enumerate(digits):
            for d in '9876543210':
                if d<=c:break
                if last.get(d,-1)>i:
                    j=last[d];digits[i],digits[j]=digits[j],digits[i];return int(''.join(digits))
        return num
