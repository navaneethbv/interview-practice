class Solution {
public int findMaxLength(int[] nums){Map<Integer,Integer>first=new HashMap<>();first.put(0,-1);int balance=0,best=0;for(int i=0;i<nums.length;i++){balance+=nums[i]==1?1:-1;if(first.containsKey(balance))best=Math.max(best,i-first.get(balance));else first.put(balance,i);}return best;}
}
