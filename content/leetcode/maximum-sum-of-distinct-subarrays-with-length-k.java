class Solution {
public long maximumSubarraySum(int[] nums,int k) {Map<Integer,Integer> count=new HashMap<>();long total=0,best=0;for(int i=0;i<nums.length;i++) {count.merge(nums[i],1,Integer::sum);total+=nums[i];if(i>=k) {int old=nums[i-k];total-=old;count.put(old,count.get(old)-1);if(count.get(old)==0) count.remove(old);}if(i>=k-1&&count.size()==k) best=Math.max(best,total);}return best;}
}
