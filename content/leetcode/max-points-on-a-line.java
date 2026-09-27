class Solution {
public int maxPoints(int[][] points){int n=points.length,best=Math.min(2,n);for(int i=0;i<n;i++)for(int j=i+1;j<n;j++){int count=0;long dx=points[j][0]-points[i][0],dy=points[j][1]-points[i][1];for(int[]p:points)if((p[0]-points[i][0])*dy==(p[1]-points[i][1])*dx)count++;best=Math.max(best,count);}return best;}
}
