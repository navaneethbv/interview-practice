class Solution:
    def convertToTitle(self, columnNumber):
        out=[]
        while columnNumber:
            columnNumber,remainder=divmod(columnNumber-1,26);out.append(chr(65+remainder))
        return ''.join(reversed(out))
