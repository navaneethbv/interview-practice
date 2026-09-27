class Solution {
public int minCost(int n,int[][] edges){List<List<int[]>> g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int[] e:edges){g.get(e[0]).add(new int[]{e[1],e[2]});g.get(e[1]).add(new int[]{e[0],2*e[2]});}int[] d=new int[n];Arrays.fill(d,Integer.MAX_VALUE);d[0]=0;PriorityQueue<int[]> q=new PriorityQueue<>(Comparator.comparingInt(a->a[0]));q.add(new int[]{0,0});while(!q.isEmpty()){int[] p=q.remove();int u=p[1];if(p[0]!=d[u])continue;if(u==n-1)return p[0];for(int[] e:g.get(u))if(p[0]+e[1]<d[e[0]]){d[e[0]]=p[0]+e[1];q.add(new int[]{d[e[0]],e[0]});}}return -1;}
}
