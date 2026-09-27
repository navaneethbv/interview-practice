class Solution {
public int maximumJumps(int[] nums,int target){int[] d=new int[nums.length];Arrays.fill(d,-1);d[0]=0;for(int j=1;j<nums.length;j++)for(int i=0;i<j;i++)if(d[i]>=0&&Math.abs((long)nums[j]-nums[i])<=target)d[j]=Math.max(d[j],d[i]+1);return d[d.length-1];}
}
