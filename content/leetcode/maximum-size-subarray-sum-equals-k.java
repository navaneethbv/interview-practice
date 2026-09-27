class Solution {
    public int maxSubArrayLen(int[] nums,int k){Map<Long,Integer> first=new HashMap<>();first.put(0L,-1);long sum=0;int best=0;for(int i=0;i<nums.length;i++){sum+=nums[i];if(first.containsKey(sum-k))best=Math.max(best,i-first.get(sum-k));first.putIfAbsent(sum,i);}return best;}
}
