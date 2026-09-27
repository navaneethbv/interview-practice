class Solution {
public List<Integer> eventualSafeNodes(int[][] graph){int n=graph.length;List<List<Integer>>reverse=new ArrayList<>();for(int i=0;i<n;i++)reverse.add(new ArrayList<>());int[]degree=new int[n];Deque<Integer>q=new ArrayDeque<>();for(int i=0;i<n;i++){degree[i]=graph[i].length;if(degree[i]==0)q.add(i);for(int j:graph[i])reverse.get(j).add(i);}List<Integer>out=new ArrayList<>();while(!q.isEmpty()){int v=q.remove();out.add(v);for(int p:reverse.get(v))if(--degree[p]==0)q.add(p);}Collections.sort(out);return out;}
}
