class Solution:
    def distMoney(self,money,children):
        if money<children:return -1
        extra=money-children;full=min(extra//7,children);extra-=full*7;left=children-full
        # Leftover money must go to someone: a lone remaining child cannot take exactly 4.
        if (left==0 and extra>0) or (left==1 and extra==3):full-=1
        return full
