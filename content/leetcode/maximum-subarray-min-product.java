class Solution {
public int maxSumMinProduct(int[] nums){long[]p=new long[nums.length+1];for(int i=0;i<nums.length;i++)p[i+1]=p[i]+nums[i];Deque<Integer>stack=new ArrayDeque<>();long best=0;for(int r=0;r<=nums.length;r++){while(!stack.isEmpty()&&(r==nums.length||nums[stack.peek()]>=nums[r])){int m=stack.pop(),l=stack.isEmpty()?0:stack.peek()+1;best=Math.max(best,(long)nums[m]*(p[r]-p[l]));}stack.push(r);}return (int)(best%1000000007);}
}
