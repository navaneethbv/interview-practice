class Solution {
public int subarraySum(int[] nums,int k){Map<Integer,Integer>counts=new HashMap<>();counts.put(0,1);int total=0,answer=0;for(int x:nums){total+=x;answer+=counts.getOrDefault(total-k,0);counts.merge(total,1,Integer::sum);}return answer;}
}
