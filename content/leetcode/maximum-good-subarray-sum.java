class Solution {
public long maximumSubarraySum(int[] nums,int k){Map<Integer,Long> m=new HashMap<>();long prefix=0,ans=Long.MIN_VALUE;for(int x:nums){m.merge(x,prefix,Math::min);prefix+=x;for(int v:new int[]{x-k,x+k})if(m.containsKey(v))ans=Math.max(ans,prefix-m.get(v));}return ans==Long.MIN_VALUE?0:ans;}
}
