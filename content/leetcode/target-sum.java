class Solution {
public int findTargetSumWays(int[] nums,int target){Map<Integer,Integer>dp=new HashMap<>();dp.put(0,1);for(int x:nums){Map<Integer,Integer>next=new HashMap<>();for(Map.Entry<Integer,Integer>e:dp.entrySet()){next.merge(e.getKey()+x,e.getValue(),Integer::sum);next.merge(e.getKey()-x,e.getValue(),Integer::sum);}dp=next;}return dp.getOrDefault(target,0);}
}
