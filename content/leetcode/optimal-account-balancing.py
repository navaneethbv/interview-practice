from collections import defaultdict
class Solution:
    def minTransfers(self,transactions):
        balance=defaultdict(int)
        for a,b,amount in transactions:balance[a]-=amount;balance[b]+=amount
        debts=[v for v in balance.values() if v]
        def settle(i):
            while i<len(debts) and debts[i]==0:i+=1
            if i==len(debts):return 0
            best=len(debts);seen=set()
            for j in range(i+1,len(debts)):
                if debts[i]*debts[j]<0 and debts[j] not in seen:
                    old=debts[j];seen.add(old);debts[j]+=debts[i];best=min(best,1+settle(i+1));debts[j]=old
                    if old+debts[i]==0:break
            return best
        return settle(0)
