class Solution:
    def minSwaps(self, grid):
        n=len(grid);zeros=[]
        for row in grid:
            count=0
            for value in reversed(row):
                if value:break
                count+=1
            zeros.append(count)
        answer=0
        for i in range(n):
            j=i
            while j<n and zeros[j]<n-i-1:j+=1
            if j==n:return -1
            answer+=j-i;zeros.insert(i,zeros.pop(j))
        return answer
