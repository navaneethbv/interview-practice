class Solution {
public int minCostConnectPoints(int[][] points){int n=points.length,total=0;int[]best=new int[n];Arrays.fill(best,Integer.MAX_VALUE);best[0]=0;boolean[]used=new boolean[n];for(int count=0;count<n;count++){int v=-1;for(int i=0;i<n;i++)if(!used[i]&&(v<0||best[i]<best[v]))v=i;total+=best[v];used[v]=true;for(int i=0;i<n;i++)if(!used[i])best[i]=Math.min(best[i],Math.abs(points[v][0]-points[i][0])+Math.abs(points[v][1]-points[i][1]));}return total;}
}
