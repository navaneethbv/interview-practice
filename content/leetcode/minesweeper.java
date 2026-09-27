class Solution {
public char[][] updateBoard(char[][] board,int[] click){int r=click[0],c=click[1];if(board[r][c]=='M'){board[r][c]='X';return board;}reveal(board,r,c);return board;}private void reveal(char[][] b,int r,int c){if(r<0||r>=b.length||c<0||c>=b[0].length||b[r][c]!='E')return;int mines=0;for(int a=r-1;a<=r+1;a++)for(int z=c-1;z<=c+1;z++)if(a>=0&&a<b.length&&z>=0&&z<b[0].length&&b[a][z]=='M')mines++;if(mines>0){b[r][c]=(char)('0'+mines);return;}b[r][c]='B';for(int a=r-1;a<=r+1;a++)for(int z=c-1;z<=c+1;z++)reveal(b,a,z);}
}
