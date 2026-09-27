class Solution {
public boolean checkSubarraySum(int[] nums,int k){Map<Long,Integer>first=new HashMap<>();first.put(0L,-1);long remainder=0;for(int i=0;i<nums.length;i++){remainder=(remainder+nums[i])%k;if(first.containsKey(remainder)){if(i-first.get(remainder)>=2)return true;}else first.put(remainder,i);}return false;}
}
