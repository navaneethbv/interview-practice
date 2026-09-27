class Solution {
public void solve(char[][] board){int m=board.length,n=board[0].length;Deque<int[]>q=new ArrayDeque<>();for(int r=0;r<m;r++)for(int c=0;c<n;c++)if((r==0||r==m-1||c==0||c==n-1)&&board[r][c]=='O'){board[r][c]='#';q.add(new int[]{r,c});}int[]ds={-1,0,1,0,-1};while(!q.isEmpty()){int[]p=q.remove();for(int d=0;d<4;d++){int a=p[0]+ds[d],b=p[1]+ds[d+1];if(a>=0&&a<m&&b>=0&&b<n&&board[a][b]=='O'){board[a][b]='#';q.add(new int[]{a,b});}}}for(int r=0;r<m;r++)for(int c=0;c<n;c++)board[r][c]=board[r][c]=='#'?'O':'X';}
}
