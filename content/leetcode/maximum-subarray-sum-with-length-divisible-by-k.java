class Solution {
public long maxSubarraySum(int[] nums,int k) {long[] minimum=new long[k];Arrays.fill(minimum,Long.MAX_VALUE);minimum[0]=0;long prefix=0,best=Long.MIN_VALUE;for(int i=0;i<nums.length;i++) {prefix+=nums[i];int r=(i+1)%k;if(minimum[r]!=Long.MAX_VALUE) best=Math.max(best,prefix-minimum[r]);minimum[r]=Math.min(minimum[r],prefix);}return best;}
}
