class Solution:
    def distMoney(self,money,children):
        if money<children:return -1
        extra=money-children;full=min(extra//7,children);extra-=full*7;left=children-full
        if left==0 and extra>0:full-=1
        elif left==1 and extra==3:full-=1
        return full
