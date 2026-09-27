class Solution {
public int minRemoval(int[] nums,int k){Arrays.sort(nums);int l=0,best=0;for(int r=0;r<nums.length;r++){while(nums[r]>(long)nums[l]*k)l++;best=Math.max(best,r-l+1);}return nums.length-best;}
}
