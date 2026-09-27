class Solution:
    def canSeePersonsCount(self, heights):
        stack=[];out=[0]*len(heights)
        for i in range(len(heights)-1,-1,-1):
            while stack and stack[-1]<heights[i]:stack.pop();out[i]+=1
            if stack:out[i]+=1
            stack.append(heights[i])
        return out
