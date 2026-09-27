from collections import defaultdict
class Solution:
    def minTransfers(self,transactions):
        balance=defaultdict(int)
        for a,b,amount in transactions:balance[a]-=amount;balance[b]+=amount
        return self._settle([v for v in balance.values() if v],0)

    def _settle(self, debts, i):
        """Fewest transfers to clear debts[i:], settling debts[i] into an opposite-signed debt."""
        while i<len(debts) and debts[i]==0:i+=1
        if i==len(debts):return 0
        best=len(debts);seen=set()
        for j in range(i+1,len(debts)):
            if debts[i]*debts[j]>=0 or debts[j] in seen:continue
            old=debts[j];seen.add(old);debts[j]+=debts[i];best=min(best,1+self._settle(debts,i+1));debts[j]=old
            if old+debts[i]==0:break
        return best
