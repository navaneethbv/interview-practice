class Solution:
    def multiply(self, mat1, mat2):
        result=[[0]*len(mat2[0]) for _ in mat1]
        rows=[[(j,v) for j,v in enumerate(row) if v] for row in mat2]
        for i,row in enumerate(mat1):
            for k,value in enumerate(row):
                if value:
                    for j,other in rows[k]: result[i][j]+=value*other
        return result
