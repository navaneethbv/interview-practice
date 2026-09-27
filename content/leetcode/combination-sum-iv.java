class Solution {
public int combinationSum4(int[] nums,int target){int[] dp=new int[target+1];dp[0]=1;for(int sum=1;sum<=target;sum++){long count=0;for(int n:nums)if(n<=sum)count+=dp[sum-n];dp[sum]=(int)Math.min(Integer.MAX_VALUE,count);}return dp[target];}
}
