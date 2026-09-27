class Solution:
    def minSpeedOnTime(self,dist,hour):
        budget=round(hour*100)
        if budget<=100*(len(dist)-1):return -1
        def possible(speed):return 100*sum((d+speed-1)//speed for d in dist[:-1])*speed+100*dist[-1]<=budget*speed
        lo,hi=1,10000000
        while lo<hi:
            mid=(lo+hi)//2
            if possible(mid):hi=mid
            else:lo=mid+1
        return lo if possible(lo) else -1
