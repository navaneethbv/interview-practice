import heapq
class Solution:
    def busiestServers(self,k,arrival,load):
        available=list(range(k));busy=[];counts=[0]*k
        for i,(time,duration) in enumerate(zip(arrival,load)):
            while busy and busy[0][0]<=time:
                _,server=heapq.heappop(busy);heapq.heappush(available,i+(server-i)%k)
            if available:
                server=heapq.heappop(available)%k;counts[server]+=1;heapq.heappush(busy,(time+duration,server))
        best=max(counts);return [i for i,c in enumerate(counts) if c==best]
