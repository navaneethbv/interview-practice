import heapq
class Solution:
    def minInterval(self, intervals, queries):
        intervals.sort()
        answers = [-1]*len(queries)
        queue, position = [], 0
        for query,index in sorted((value,i) for i,value in enumerate(queries)):
            while position < len(intervals) and intervals[position][0] <= query:
                left,right = intervals[position]
                heapq.heappush(queue,(right-left+1,right))
                position += 1
            while queue and queue[0][1] < query:
                heapq.heappop(queue)
            if queue:
                answers[index] = queue[0][0]
        return answers
