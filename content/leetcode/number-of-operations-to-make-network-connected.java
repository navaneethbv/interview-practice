class Solution {
private int find(int[] p,int x) {while(p[x]!=x) {p[x]=p[p[x]];x=p[x];}return x;}public int makeConnected(int n,int[][] connections) {if(connections.length<n-1) return -1;int[] p=new int[n];for(int i=0;i<n;i++) p[i]=i;int count=n;for(int[] e:connections) {int a=find(p,e[0]),b=find(p,e[1]);if(a!=b) {p[a]=b;count--;}}return count-1;}
}
