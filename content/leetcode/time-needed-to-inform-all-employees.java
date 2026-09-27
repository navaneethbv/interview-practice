class Solution {
public int numOfMinutes(int n,int headID,int[] manager,int[] informTime){List<List<Integer>> g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());for(int i=0;i<n;i++)if(manager[i]>=0)g.get(manager[i]).add(i);ArrayDeque<int[]> q=new ArrayDeque<>();q.add(new int[]{headID,0});int ans=0;while(!q.isEmpty()){int[] p=q.remove();ans=Math.max(ans,p[1]);for(int x:g.get(p[0]))q.add(new int[]{x,p[1]+informTime[p[0]]});}return ans;}
}
