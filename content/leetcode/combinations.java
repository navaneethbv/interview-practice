class Solution {
    public List<List<Integer>> combine(int n,int k){List<List<Integer>> out=new ArrayList<>();visit(1,n,k,new ArrayList<>(),out);return out;}
    private void visit(int start,int n,int k,List<Integer> path,List<List<Integer>> out){if(path.size()==k){out.add(new ArrayList<>(path));return;}for(int v=start;v<=n-(k-path.size())+1;v++){path.add(v);visit(v+1,n,k,path,out);path.remove(path.size()-1);}}
}
