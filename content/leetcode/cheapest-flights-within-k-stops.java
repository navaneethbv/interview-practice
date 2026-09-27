class Solution {
public int findCheapestPrice(int n,int[][] flights,int src,int dst,int k){int[]cost=new int[n];Arrays.fill(cost,1000000000);cost[src]=0;for(int i=0;i<=k;i++){int[]next=cost.clone();for(int[]f:flights)next[f[1]]=Math.min(next[f[1]],cost[f[0]]+f[2]);cost=next;}return cost[dst]==1000000000?-1:cost[dst];}
}
