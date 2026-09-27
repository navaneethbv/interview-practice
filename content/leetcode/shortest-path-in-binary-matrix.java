class Solution {
public int shortestPathBinaryMatrix(int[][] grid){int n=grid.length;if(grid[0][0]!=0||grid[n-1][n-1]!=0)return -1;boolean[][]seen=new boolean[n][n];seen[0][0]=true;Deque<int[]>q=new ArrayDeque<>();q.add(new int[]{0,0,1});while(!q.isEmpty()){int[]p=q.remove();if(p[0]==n-1&&p[1]==n-1)return p[2];for(int a=p[0]-1;a<=p[0]+1;a++)for(int b=p[1]-1;b<=p[1]+1;b++)if(a>=0&&a<n&&b>=0&&b<n&&!seen[a][b]&&grid[a][b]==0){seen[a][b]=true;q.add(new int[]{a,b,p[2]+1});}}return -1;}
}
