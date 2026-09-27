class Solution {
private int find(int[] p,int x) {while(p[x]!=x) {p[x]=p[p[x]];x=p[x];}return x;}private boolean join(int[] p,int u,int v) {u=find(p,u);v=find(p,v);if(u==v) return false;p[u]=v;return true;}
public int maxNumEdgesToRemove(int n,int[][] edges) {int[] a=new int[n+1],b=new int[n+1];for(int i=1;i<=n;i++) a[i]=b[i]=i;Arrays.sort(edges,(x,y)->Integer.compare(y[0],x[0]));int used=0,ca=0,cb=0;for(int[] e:edges) {if(e[0]==3) {boolean x=join(a,e[1],e[2]),y=join(b,e[1],e[2]);if(x) ca++;if(y) cb++;if(x||y) used++;}else if(e[0]==1) {if(join(a,e[1],e[2])) {ca++;used++;}}else if(join(b,e[1],e[2])) {cb++;used++;}}return ca==n-1&&cb==n-1?edges.length-used:-1;}
}
