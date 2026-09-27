class Solution:
    def makesquare(self,matchsticks):
        total=sum(matchsticks)
        if total%4 or len(matchsticks)<4:return False
        target=total//4;sticks=sorted(matchsticks,reverse=True);sides=[0]*4
        if sticks[0]>target:return False
        def place(i):
            if i==len(sticks):return True
            seen=set()
            for j in range(4):
                if sides[j] in seen or sides[j]+sticks[i]>target:continue
                seen.add(sides[j]);sides[j]+=sticks[i]
                if place(i+1):return True
                sides[j]-=sticks[i]
            return False
        return place(0)
