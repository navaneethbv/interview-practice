class Solution {
public int jobScheduling(int[] startTime,int[] endTime,int[] profit){int n=profit.length;int[][]jobs=new int[n][3];for(int i=0;i<n;i++)jobs[i]=new int[]{endTime[i],startTime[i],profit[i]};Arrays.sort(jobs,Comparator.comparingInt(a->a[0]));int[]dp=new int[n+1];for(int i=0;i<n;i++){int l=0,r=i;while(l<r){int m=(l+r)/2;if(jobs[m][0]<=jobs[i][1])l=m+1;else r=m;}dp[i+1]=Math.max(dp[i],dp[l]+jobs[i][2]);}return dp[n];}
}
