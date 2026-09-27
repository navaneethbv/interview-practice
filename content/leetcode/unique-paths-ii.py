class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid):
        paths=[0]*len(obstacleGrid[0]); paths[0]=1
        for row in obstacleGrid:
            for c,blocked in enumerate(row):
                if blocked: paths[c]=0
                elif c: paths[c]+=paths[c-1]
        return paths[-1]
