class Solution {
public int minSubArrayLen(int target,int[] nums){int l=0,total=0,best=nums.length+1;for(int r=0;r<nums.length;r++){total+=nums[r];while(total>=target){best=Math.min(best,r-l+1);total-=nums[l++];}}return best<=nums.length?best:0;}
}
