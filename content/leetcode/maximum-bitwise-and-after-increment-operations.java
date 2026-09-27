class Solution {
public int maximumAND(int[] nums,int k,int m){long answer=0;for(int bit=30;bit>=0;bit--){long mask=answer|(1L<<bit);long[] costs=new long[nums.length];for(int i=0;i<nums.length;i++){long x=nums[i],missing=mask&~x;if(missing!=0){int b=64-Long.numberOfLeadingZeros(missing);long y=(x>>b<<b)|(mask&((1L<<b)-1));costs[i]=y-x;}}Arrays.sort(costs);long sum=0;for(int i=0;i<m;i++)sum+=costs[i];if(sum<=k)answer=mask;}return (int)answer;}
}
