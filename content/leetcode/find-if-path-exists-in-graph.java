class Solution {
public boolean validPath(int n,int[][] edges,int source,int destination){int[]p=new int[n];for(int i=0;i<n;i++)p[i]=i;for(int[]e:edges)p[find(p,e[0])]=find(p,e[1]);return find(p,source)==find(p,destination);}private int find(int[]p,int x){while(p[x]!=x){p[x]=p[p[x]];x=p[x];}return x;}
}
