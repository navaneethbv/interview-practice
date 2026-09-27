class Solution {
public List<Integer> findMinHeightTrees(int n,int[][] edges){if(n==1)return Arrays.asList(0);List<List<Integer>>g=new ArrayList<>();for(int i=0;i<n;i++)g.add(new ArrayList<>());int[]d=new int[n];for(int[]e:edges){g.get(e[0]).add(e[1]);g.get(e[1]).add(e[0]);d[e[0]]++;d[e[1]]++;}Deque<Integer>q=new ArrayDeque<>();for(int i=0;i<n;i++)if(d[i]==1)q.add(i);int left=n;while(left>2){int size=q.size();left-=size;while(size-->0){int v=q.remove();for(int w:g.get(v))if(--d[w]==1)q.add(w);}}return new ArrayList<>(q);}
}
