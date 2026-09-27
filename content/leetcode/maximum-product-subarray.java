class Solution {
public int maxProduct(int[] nums){int lo=nums[0],hi=lo,best=lo;for(int i=1;i<nums.length;i++){int x=nums[i],a=x*lo,b=x*hi;lo=Math.min(x,Math.min(a,b));hi=Math.max(x,Math.max(a,b));best=Math.max(best,hi);}return best;}
}
