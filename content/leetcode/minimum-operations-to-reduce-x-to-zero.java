class Solution {
public int minOperations(int[] nums,int x){int target=Arrays.stream(nums).sum()-x;if(target<0)return -1;if(target==0)return nums.length;int left=0,total=0,best=-1;for(int right=0;right<nums.length;right++){total+=nums[right];while(total>target)total-=nums[left++];if(total==target)best=Math.max(best,right-left+1);}return best<0?-1:nums.length-best;}
}
