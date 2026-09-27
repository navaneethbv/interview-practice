class Solution {
public long minCost(int[] nums,int[] cost){int[][]pairs=new int[nums.length][2];long total=0;for(int i=0;i<nums.length;i++){pairs[i]=new int[]{nums[i],cost[i]};total+=cost[i];}Arrays.sort(pairs,Comparator.comparingInt(a->a[0]));long sum=0;int target=0;for(int[]p:pairs){sum+=p[1];if(sum>=(total+1)/2){target=p[0];break;}}long answer=0;for(int i=0;i<nums.length;i++)answer+=(long)Math.abs(nums[i]-target)*cost[i];return answer;}
}
