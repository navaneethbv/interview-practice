class Solution {
public int countSubarrays(int[] nums,int k) {int pivot=0;while(nums[pivot]!=k) pivot++;Map<Integer,Integer> counts=new HashMap<>();counts.put(0,1);int balance=0;for(int i=pivot-1;i>=0;i--) {balance+=nums[i]>k?1:-1;counts.merge(balance,1,Integer::sum);}int result=counts.getOrDefault(0,0)+counts.getOrDefault(1,0);balance=0;for(int i=pivot+1;i<nums.length;i++) {balance+=nums[i]>k?1:-1;result+=counts.getOrDefault(-balance,0)+counts.getOrDefault(1-balance,0);}return result;}
}
