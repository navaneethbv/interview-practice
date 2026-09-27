class Solution {
public int earliestAcq(int[][] logs,int n){Arrays.sort(logs,Comparator.comparingInt(a->a[0]));int[]p=new int[n];for(int i=0;i<n;i++)p[i]=i;int groups=n;for(int[]log:logs){int a=find(p,log[1]),b=find(p,log[2]);if(a!=b){p[a]=b;if(--groups==1)return log[0];}}return -1;}private int find(int[]p,int x){while(p[x]!=x){p[x]=p[p[x]];x=p[x];}return x;}
}
