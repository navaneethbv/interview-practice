from collections import Counter
class Solution:
    def totalFruit(self, fruits):
        count=Counter();left=best=0
        for right,x in enumerate(fruits):
            count[x]+=1
            while len(count)>2:
                value=fruits[left];count[value]-=1;left+=1
                if count[value]==0:del count[value]
            best=max(best,right-left+1)
        return best
