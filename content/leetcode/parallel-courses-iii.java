class Solution {
public int minimumTime(int n,int[][] relations,int[] time){List<List<Integer>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());int[]degree=new int[n],finish=time.clone();for(int[]e:relations){g.get(e[0]-1).add(e[1]-1);degree[e[1]-1]++;}Deque<Integer>q=new ArrayDeque<>();for(int i=0;i<n;i++)if(degree[i]==0)q.add(i);int best=0;while(!q.isEmpty()){int v=q.remove();best=Math.max(best,finish[v]);for(int w:g.get(v)){finish[w]=Math.max(finish[w],finish[v]+time[w]);if(--degree[w]==0)q.add(w);}}return best;}
}
