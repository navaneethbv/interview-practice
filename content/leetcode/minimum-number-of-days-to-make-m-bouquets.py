class Solution:
    def minDays(self, bloomDay, m, k):
        if m*k>len(bloomDay):return -1
        low,high=min(bloomDay),max(bloomDay)
        while low<high:
            day=(low+high)//2;run=bouquets=0
            for value in bloomDay:
                run=run+1 if value<=day else 0
                if run==k:bouquets+=1;run=0
            if bouquets>=m:high=day
            else:low=day+1
        return low
