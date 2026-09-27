import heapq
class Solution:
    def mostBooked(self, n, meetings):
        free=list(range(n));busy=[];counts=[0]*n
        for start,end in sorted(meetings):
            while busy and busy[0][0]<=start:
                finished,room=heapq.heappop(busy);heapq.heappush(free,room)
            if free:room=heapq.heappop(free);finish=end
            else:
                available,room=heapq.heappop(busy);finish=available+end-start
            counts[room]+=1;heapq.heappush(busy,(finish,room))
        return max(range(n),key=lambda room:counts[room])
