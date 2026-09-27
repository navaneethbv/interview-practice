class Solution {
public int[] productExceptSelf(int[] nums){ int[] out=new int[nums.length]; int p=1; for(int i=0;i<nums.length;i++){out[i]=p;p*=nums[i];} int s=1;for(int i=nums.length-1;i>=0;i--){out[i]*=s;s*=nums[i];}return out;}
}
