class Solution {
int[] distances(int[] e,int v){int[] d=new int[e.length];Arrays.fill(d,-1);int t=0;while(v!=-1&&d[v]<0){d[v]=t++;v=e[v];}return d;}public int closestMeetingNode(int[] edges,int node1,int node2){int[] a=distances(edges,node1),b=distances(edges,node2);int best=edges.length+1,ans=-1;for(int i=0;i<edges.length;i++)if(a[i]>=0&&b[i]>=0&&Math.max(a[i],b[i])<best){best=Math.max(a[i],b[i]);ans=i;}return ans;}
}
