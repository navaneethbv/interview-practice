class Solution {
public int[][] updateMatrix(int[][] mat){int m=mat.length,n=mat[0].length;int[][]d=new int[m][n];Deque<int[]>q=new ArrayDeque<>();for(int r=0;r<m;r++)for(int c=0;c<n;c++){d[r][c]=mat[r][c]==0?0:-1;if(d[r][c]==0)q.add(new int[]{r,c});}int[]ds={-1,0,1,0,-1};while(!q.isEmpty()){int[]p=q.remove();for(int k=0;k<4;k++){int a=p[0]+ds[k],b=p[1]+ds[k+1];if(a>=0&&a<m&&b>=0&&b<n&&d[a][b]<0){d[a][b]=d[p[0]][p[1]]+1;q.add(new int[]{a,b});}}}return d;}
}
