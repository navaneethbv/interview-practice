class Solution {
public void sortColors(int[] nums){int lo=0,i=0,hi=nums.length-1;while(i<=hi){if(nums[i]==0){int t=nums[lo];nums[lo++]=nums[i];nums[i++]=t;}else if(nums[i]==2){int t=nums[hi];nums[hi--]=nums[i];nums[i]=t;}else i++;}}
}
