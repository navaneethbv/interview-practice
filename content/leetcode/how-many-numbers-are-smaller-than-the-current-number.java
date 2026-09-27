class Solution {
public int[] smallerNumbersThanCurrent(int[] nums) {int[] counts=new int[101];for(int n:nums) counts[n]++;int prefix=0;for(int i=0;i<counts.length;i++) {int count=counts[i];counts[i]=prefix;prefix+=count;}int[] result=new int[nums.length];for(int i=0;i<nums.length;i++) result[i]=counts[nums[i]];return result;}
}
