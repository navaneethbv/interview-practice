class Solution {
public void wallsAndGates(int[][] rooms){int m=rooms.length,n=rooms[0].length;Deque<int[]> q=new ArrayDeque<>();for(int r=0;r<m;r++)for(int c=0;c<n;c++)if(rooms[r][c]==0)q.add(new int[]{r,c});int[] ds={-1,0,1,0,-1};while(!q.isEmpty()){int[] p=q.remove();for(int d=0;d<4;d++){int a=p[0]+ds[d],b=p[1]+ds[d+1];if(a>=0&&a<m&&b>=0&&b<n&&rooms[a][b]==Integer.MAX_VALUE){rooms[a][b]=rooms[p[0]][p[1]]+1;q.add(new int[]{a,b});}}}}
}
