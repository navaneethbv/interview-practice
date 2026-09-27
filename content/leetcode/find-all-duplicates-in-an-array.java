class Solution {
public List<Integer> findDuplicates(int[] nums){List<Integer>out=new ArrayList<>();for(int x:nums){int v=Math.abs(x);if(nums[v-1]<0)out.add(v);else nums[v-1]=-nums[v-1];}return out;}
}
