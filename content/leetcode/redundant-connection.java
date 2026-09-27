class Solution {
int find(int[] p,int x){while(p[x]!=x){p[x]=p[p[x]];x=p[x];}return x;}public int[] findRedundantConnection(int[][] edges){int[] p=new int[edges.length+1];for(int i=0;i<p.length;i++)p[i]=i;for(int[] e:edges){int x=find(p,e[0]),y=find(p,e[1]);if(x==y)return e;p[x]=y;}return new int[0];}
}
