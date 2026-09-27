class Solution:
    def findBuildings(self, heights):
        tallest=0;out=[]
        for i in range(len(heights)-1,-1,-1):
            if heights[i]>tallest:out.append(i);tallest=heights[i]
        return out[::-1]
