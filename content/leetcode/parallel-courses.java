class Solution {
public int minimumSemesters(int n,int[][] relations) {List<List<Integer>> edges=new ArrayList<>();for(int i=0;i<=n;i++) edges.add(new ArrayList<>());int[] degree=new int[n+1];for(int[] e:relations) {edges.get(e[0]).add(e[1]);degree[e[1]]++;}Deque<Integer> q=new ArrayDeque<>();for(int i=1;i<=n;i++) if(degree[i]==0) q.add(i);int semesters=0,count=0;while(!q.isEmpty()) {int size=q.size();semesters++;count+=size;for(int i=0;i<size;i++) for(int next:edges.get(q.remove())) if(--degree[next]==0) q.add(next);}return count==n?semesters:-1;}
}
