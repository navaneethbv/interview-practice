class Solution {
public int subarraysDivByK(int[] nums,int k) {int[] counts=new int[k];counts[0]=1;int remainder=0,total=0;for(int n:nums) {remainder=Math.floorMod(remainder+n,k);total+=counts[remainder];counts[remainder]++;}return total;}
}
