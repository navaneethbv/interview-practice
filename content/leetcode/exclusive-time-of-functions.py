class Solution:
    def exclusiveTime(self, n, logs):
        out=[0]*n;stack=[];previous=0
        for log in logs:
            identity,event,time=log.split(':');identity,time=int(identity),int(time)
            if event=='start':
                if stack:out[stack[-1]]+=time-previous
                stack.append(identity);previous=time
            else:out[stack.pop()]+=time-previous+1;previous=time+1
        return out
