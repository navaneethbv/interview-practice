class Solution {
public List<List<Integer>> combinationSum3(int k,int n){List<List<Integer>>out=new ArrayList<>();go(1,k,n,new ArrayList<>(),out);return out;}private void go(int start,int k,int remaining,List<Integer>path,List<List<Integer>>out){if(path.size()==k){if(remaining==0)out.add(new ArrayList<>(path));return;}for(int v=start;v<=9&&v<=remaining;v++){path.add(v);go(v+1,k,remaining-v,path,out);path.remove(path.size()-1);}}
}
