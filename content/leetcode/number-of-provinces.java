class Solution {
public int findCircleNum(int[][] isConnected){int n=isConnected.length,count=0;boolean[]seen=new boolean[n];for(int i=0;i<n;i++)if(!seen[i]){count++;Deque<Integer>q=new ArrayDeque<>();q.add(i);seen[i]=true;while(!q.isEmpty()){int v=q.remove();for(int j=0;j<n;j++)if(isConnected[v][j]==1&&!seen[j]){seen[j]=true;q.add(j);}}}return count;}
}
