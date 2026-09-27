class Solution {
public List<Integer> findDisappearedNumbers(int[] nums){for(int x:nums){int i=Math.abs(x)-1;nums[i]=-Math.abs(nums[i]);}List<Integer>out=new ArrayList<>();for(int i=0;i<nums.length;i++)if(nums[i]>0)out.add(i+1);return out;}
}
