class Solution {
public List<List<Integer>> criticalConnections(int n,List<List<Integer>> connections) {
    List<List<Integer>> adj=new ArrayList<>();for(int i=0;i<n;i++) adj.add(new ArrayList<>());for(List<Integer> e:connections) {adj.get(e.get(0)).add(e.get(1));adj.get(e.get(1)).add(e.get(0));}
    int[] disc=new int[n],low=new int[n],parent=new int[n],cursor=new int[n];Arrays.fill(disc,-1);Arrays.fill(parent,-1);disc[0]=low[0]=0;int timer=1;Deque<Integer> stack=new ArrayDeque<>();stack.push(0);List<List<Integer>> result=new ArrayList<>();
    while(!stack.isEmpty()) {int node=stack.peek();if(cursor[node]==adj.get(node).size()) {stack.pop();int p=parent[node];if(p!=-1) {if(low[node]>disc[p]) result.add(Arrays.asList(p,node));low[p]=Math.min(low[p],low[node]);}continue;}int child=adj.get(node).get(cursor[node]++);if(child==parent[node]) continue;if(disc[child]==-1) {parent[child]=node;disc[child]=low[child]=timer++;stack.push(child);}else low[node]=Math.min(low[node],disc[child]);}return result;
}
}
