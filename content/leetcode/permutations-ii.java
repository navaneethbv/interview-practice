class Solution {
public List<List<Integer>> permuteUnique(int[] nums){Arrays.sort(nums);List<List<Integer>>out=new ArrayList<>();go(nums,new boolean[nums.length],new ArrayList<>(),out);return out;}private void go(int[]nums,boolean[]used,List<Integer>path,List<List<Integer>>out){if(path.size()==nums.length){out.add(new ArrayList<>(path));return;}for(int i=0;i<nums.length;i++)if(!used[i]&&(i==0||nums[i]!=nums[i-1]||used[i-1])){used[i]=true;path.add(nums[i]);go(nums,used,path,out);path.remove(path.size()-1);used[i]=false;}}
}
