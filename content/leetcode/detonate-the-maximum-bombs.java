class Solution {
public int maximumDetonation(int[][] bombs){int n=bombs.length,ans=0;boolean[][] g=new boolean[n][n];for(int i=0;i<n;i++)for(int j=0;j<n;j++){long x=(long)bombs[i][0]-bombs[j][0],y=(long)bombs[i][1]-bombs[j][1],r=bombs[i][2];g[i][j]=x*x+y*y<=r*r;}for(int s=0;s<n;s++){boolean[] seen=new boolean[n];ArrayDeque<Integer> q=new ArrayDeque<>();q.add(s);seen[s]=true;int count=0;while(!q.isEmpty()){int u=q.remove();count++;for(int v=0;v<n;v++)if(g[u][v]&&!seen[v]){seen[v]=true;q.add(v);}}ans=Math.max(ans,count);}return ans;}
}
