class Solution {
public List<List<Integer>> allPathsSourceTarget(int[][] graph){List<List<Integer>>out=new ArrayList<>();List<Integer>p=new ArrayList<>();p.add(0);visit(graph,p,out);return out;}private void visit(int[][]g,List<Integer>p,List<List<Integer>>out){int v=p.get(p.size()-1);if(v==g.length-1){out.add(new ArrayList<>(p));return;}for(int w:g[v]){p.add(w);visit(g,p,out);p.remove(p.size()-1);}}
}
