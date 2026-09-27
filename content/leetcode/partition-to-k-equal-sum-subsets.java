class Solution {
private boolean place(int[] nums,int i,int[] buckets,int target) {if(i<0) return true;Set<Integer> seen=new HashSet<>();for(int b=0;b<buckets.length;b++) {if(!seen.add(buckets[b])||buckets[b]+nums[i]>target) continue;buckets[b]+=nums[i];if(place(nums,i-1,buckets,target)) return true;buckets[b]-=nums[i];if(buckets[b]==0) break;}return false;}public boolean canPartitionKSubsets(int[] nums,int k) {int total=Arrays.stream(nums).sum();if(total%k!=0) return false;Arrays.sort(nums);if(nums[nums.length-1]>total/k) return false;return place(nums,nums.length-1,new int[k],total/k);}
}
