class Solution {
private int atMost(int[] nums,int k) {Map<Integer,Integer> count=new HashMap<>();int l=0,total=0;for(int r=0;r<nums.length;r++) {count.merge(nums[r],1,Integer::sum);while(count.size()>k) {int old=nums[l++];count.put(old,count.get(old)-1);if(count.get(old)==0) count.remove(old);}total+=r-l+1;}return total;}public int subarraysWithKDistinct(int[] nums,int k) {return atMost(nums,k)-atMost(nums,k-1);}
}
