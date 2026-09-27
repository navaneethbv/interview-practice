class Solution {
public int longestNiceSubarray(int[] nums) {int mask=0,left=0,best=0;for(int right=0;right<nums.length;right++) {while((mask&nums[right])!=0) mask^=nums[left++];mask|=nums[right];best=Math.max(best,right-left+1);}return best;}
}
