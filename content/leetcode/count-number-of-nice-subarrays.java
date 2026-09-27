class Solution {
public int numberOfSubarrays(int[] nums,int k) {int[] counts=new int[nums.length+1];counts[0]=1;int odd=0,total=0;for(int n:nums) {odd+=n%2;if(odd>=k) total+=counts[odd-k];counts[odd]++;}return total;}
}
