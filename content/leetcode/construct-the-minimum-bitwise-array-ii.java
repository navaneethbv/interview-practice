class Solution {
public int[] minBitwiseArray(List<Integer> nums) {int[] result=new int[nums.size()];for(int i=0;i<nums.size();i++) {int value=nums.get(i);if(value==2) {result[i]=-1;continue;}int bit=1;while((value&bit)!=0) bit<<=1;result[i]=value-(bit>>1);}return result;}
}
