class NumMatrix {
    private final int rows,cols;private final int[][] values,bit;
    public NumMatrix(int[][] matrix){rows=matrix.length;cols=matrix[0].length;values=new int[rows][cols];bit=new int[rows+1][cols+1];for(int r=0;r<rows;r++)for(int c=0;c<cols;c++)update(r,c,matrix[r][c]);}
    public void update(int row,int col,int val){int delta=val-values[row][col];values[row][col]=val;for(int r=row+1;r<=rows;r+=r&-r)for(int c=col+1;c<=cols;c+=c&-c)bit[r][c]+=delta;}
    private int prefix(int row,int col){int sum=0;for(int r=row;r>0;r-=r&-r)for(int c=col;c>0;c-=c&-c)sum+=bit[r][c];return sum;}
    public int sumRegion(int row1,int col1,int row2,int col2){return prefix(row2+1,col2+1)-prefix(row1,col2+1)-prefix(row2+1,col1)+prefix(row1,col1);}
}
