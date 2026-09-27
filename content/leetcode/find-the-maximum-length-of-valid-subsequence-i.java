class Solution {
public int maximumLength(int[] nums) {int even=0,alternating=1;for(int n:nums) if(n%2==0) even++;for(int i=1;i<nums.length;i++) if(nums[i]%2!=nums[i-1]%2) alternating++;return Math.max(alternating,Math.max(even,nums.length-even));}
}
