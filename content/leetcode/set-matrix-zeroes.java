class Solution {
    public void setZeroes(int[][] matrix) {
        int m=matrix.length,n=matrix[0].length;boolean row=false,col=false;
        for(int c=0;c<n;c++) row|=matrix[0][c]==0;for(int r=0;r<m;r++) col|=matrix[r][0]==0;
        for(int r=1;r<m;r++) for(int c=1;c<n;c++) if(matrix[r][c]==0) {matrix[r][0]=0;matrix[0][c]=0;}
        for(int r=1;r<m;r++) for(int c=1;c<n;c++) if(matrix[r][0]==0||matrix[0][c]==0) matrix[r][c]=0;
        if(row) Arrays.fill(matrix[0],0);if(col) for(int r=0;r<m;r++) matrix[r][0]=0;
    }
}
