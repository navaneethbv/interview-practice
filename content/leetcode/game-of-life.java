class Solution {
    public void gameOfLife(int[][] board){int rows=board.length,cols=board[0].length;for(int r=0;r<rows;r++)for(int c=0;c<cols;c++){int count=0;for(int a=Math.max(0,r-1);a<Math.min(rows,r+2);a++)for(int b=Math.max(0,c-1);b<Math.min(cols,c+2);b++)if(a!=r||b!=c)count+=board[a][b]&1;if(count==3||((board[r][c]&1)==1&&count==2))board[r][c]|=2;}for(int r=0;r<rows;r++)for(int c=0;c<cols;c++)board[r][c]>>=1;}
}
