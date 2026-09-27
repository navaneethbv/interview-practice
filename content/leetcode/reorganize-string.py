from collections import Counter
import heapq
class Solution:
    def reorganizeString(self, s):
        heap=[(-n,c) for c,n in Counter(s).items()];heapq.heapify(heap);previous=(0,'');out=[]
        while heap:
            count,c=heapq.heappop(heap);out.append(c)
            if previous[0]<0:heapq.heappush(heap,previous)
            previous=(count+1,c)
        return ''.join(out) if len(out)==len(s) else ''
