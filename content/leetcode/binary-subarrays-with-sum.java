class Solution {
public int numSubarraysWithSum(int[] nums,int goal) {Map<Integer,Integer> counts=new HashMap<>();counts.put(0,1);int prefix=0,total=0;for(int n:nums) {prefix+=n;total+=counts.getOrDefault(prefix-goal,0);counts.merge(prefix,1,Integer::sum);}return total;}
}
