class Solution {
public int minSwaps(int[] nums,int[] forbidden) {int n=nums.length;Map<Integer,Integer> combined=new HashMap<>(),bad=new HashMap<>();int total=0,maximum=0;for(int i=0;i<n;i++) {combined.merge(nums[i],1,Integer::sum);combined.merge(forbidden[i],1,Integer::sum);if(nums[i]==forbidden[i]) {total++;int count=bad.merge(nums[i],1,Integer::sum);maximum=Math.max(maximum,count);}}for(int count:combined.values()) if(count>n) return -1;return Math.max((total+1)/2,maximum);}
}
