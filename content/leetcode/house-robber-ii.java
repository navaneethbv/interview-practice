class Solution {
public int rob(int[] nums){if(nums.length==1)return nums[0];return Math.max(linear(nums,0,nums.length-1),linear(nums,1,nums.length));} private int linear(int[] nums,int start,int end){int older=0,prev=0;for(int i=start;i<end;i++){int next=Math.max(prev,older+nums[i]);older=prev;prev=next;}return prev;}
}
