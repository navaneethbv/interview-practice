class Solution {
public List<List<Integer>> permute(int[] nums){List<List<Integer>> out=new ArrayList<>();go(nums,new boolean[nums.length],new ArrayList<>(),out);return out;} private void go(int[] a,boolean[] used,List<Integer> path,List<List<Integer>> out){if(path.size()==a.length){out.add(new ArrayList<>(path));return;}for(int i=0;i<a.length;i++)if(!used[i]){used[i]=true;path.add(a[i]);go(a,used,path,out);path.remove(path.size()-1);used[i]=false;}}
}
