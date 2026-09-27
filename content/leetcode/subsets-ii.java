class Solution {
public List<List<Integer>> subsetsWithDup(int[] nums){Arrays.sort(nums);List<List<Integer>> out=new ArrayList<>();go(nums,0,new ArrayList<>(),out);return out;} private void go(int[] a,int start,List<Integer> path,List<List<Integer>> out){out.add(new ArrayList<>(path));for(int i=start;i<a.length;i++){if(i>start&&a[i]==a[i-1])continue;path.add(a[i]);go(a,i+1,path,out);path.remove(path.size()-1);}}
}
