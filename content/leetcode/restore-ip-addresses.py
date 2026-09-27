class Solution:
    def restoreIpAddresses(self, s):
        out=[]
        def visit(start,parts):
            if len(parts)==4:
                if start==len(s):out.append('.'.join(parts))
                return
            remaining=4-len(parts)
            if not remaining<=len(s)-start<=3*remaining:return
            for size in range(1,4):
                piece=s[start:start+size]
                if len(piece)!=size or (size>1 and piece[0]=='0') or int(piece)>255:continue
                visit(start+size,parts+[piece])
        visit(0,[]);return out
