class Solution {
public int[] sortedSquares(int[] nums){int l=0,r=nums.length-1;int[]out=new int[nums.length];for(int i=out.length-1;i>=0;i--)if(Math.abs(nums[l])>Math.abs(nums[r])){out[i]=nums[l]*nums[l];l++;}else{out[i]=nums[r]*nums[r];r--;}return out;}
}
