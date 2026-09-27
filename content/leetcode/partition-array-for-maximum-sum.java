class Solution {
public int maxSumAfterPartitioning(int[] arr,int k){int[]dp=new int[arr.length+1];for(int end=1;end<=arr.length;end++){int max=0;for(int size=1;size<=k&&size<=end;size++){max=Math.max(max,arr[end-size]);dp[end]=Math.max(dp[end],dp[end-size]+max*size);}}return dp[arr.length];}
}
