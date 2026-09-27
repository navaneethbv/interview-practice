class Solution {
public boolean possibleBipartition(int n,int[][] dislikes) {List<List<Integer>> edges=new ArrayList<>();for(int i=0;i<=n;i++) edges.add(new ArrayList<>());for(int[] e:dislikes) {edges.get(e[0]).add(e[1]);edges.get(e[1]).add(e[0]);}int[] color=new int[n+1];for(int start=1;start<=n;start++) {if(color[start]!=0) continue;Deque<Integer> q=new ArrayDeque<>();q.add(start);color[start]=1;while(!q.isEmpty()) {int x=q.remove();for(int y:edges.get(x)) {if(color[y]==color[x]) return false;if(color[y]==0) {color[y]=-color[x];q.add(y);}}}}return true;}
}
