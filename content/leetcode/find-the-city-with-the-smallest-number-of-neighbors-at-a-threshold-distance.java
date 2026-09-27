class Solution {
public int findTheCity(int n,int[][] edges,int distanceThreshold) {int[][] d=new int[n][n];for(int i=0;i<n;i++) {Arrays.fill(d[i],100000000);d[i][i]=0;}for(int[] e:edges) d[e[0]][e[1]]=d[e[1]][e[0]]=e[2];for(int k=0;k<n;k++) for(int i=0;i<n;i++) for(int j=0;j<n;j++) d[i][j]=Math.min(d[i][j],d[i][k]+d[k][j]);int best=n,result=-1;for(int i=0;i<n;i++) {int count=0;for(int j=0;j<n;j++) if(i!=j&&d[i][j]<=distanceThreshold) count++;if(count<=best) {best=count;result=i;}}return result;}
}
