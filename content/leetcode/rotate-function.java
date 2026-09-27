class Solution {
public int maxRotateFunction(int[] nums){long total=0,f=0;for(int i=0;i<nums.length;i++){total+=nums[i];f+=(long)i*nums[i];}long ans=f;for(int i=nums.length-1;i>0;i--){f+=total-(long)nums.length*nums[i];ans=Math.max(ans,f);}return (int)ans;}
}
