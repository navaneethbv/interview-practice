class Solution:
    def employeeFreeTime(self, schedule):
        intervals=sorted((i.start,i.end) for row in schedule for i in row)
        end=intervals[0][1];out=[]
        for start,finish in intervals[1:]:
            if start>end:out.append(Interval(end,start))
            end=max(end,finish)
        return out
