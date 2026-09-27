class NumMatrix:
    def __init__(self, matrix):
        self.rows,self.cols=len(matrix),len(matrix[0])
        self.values=[[0]*self.cols for _ in range(self.rows)]
        self.bit=[[0]*(self.cols+1) for _ in range(self.rows+1)]
        for r in range(self.rows):
            for c in range(self.cols): self.update(r,c,matrix[r][c])
    def update(self, row, col, val):
        delta=val-self.values[row][col]; self.values[row][col]=val; r=row+1
        while r<=self.rows:
            c=col+1
            while c<=self.cols: self.bit[r][c]+=delta; c+=c&-c
            r+=r&-r
    def _prefix(self, row, col):
        total=0
        while row>0:
            c=col
            while c>0: total+=self.bit[row][c]; c-=c&-c
            row-=row&-row
        return total
    def sumRegion(self, row1, col1, row2, col2):
        return self._prefix(row2+1,col2+1)-self._prefix(row1,col2+1)-self._prefix(row2+1,col1)+self._prefix(row1,col1)
