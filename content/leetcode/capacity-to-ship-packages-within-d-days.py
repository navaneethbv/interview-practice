class Solution:
    def shipWithinDays(self, weights, days):
        low,high=max(weights),sum(weights)
        while low<high:
            cap=(low+high)//2;used=1;load=0
            for weight in weights:
                if load+weight>cap:used+=1;load=0
                load+=weight
            if used<=days:high=cap
            else:low=cap+1
        return low
