class Solution {
public int maxDotProduct(int[] nums1,int[] nums2) {int[] previous=new int[nums2.length+1];Arrays.fill(previous,-1000000000);for(int a:nums1) {int[] current=new int[nums2.length+1];Arrays.fill(current,-1000000000);for(int j=1;j<=nums2.length;j++) current[j]=Math.max(a*nums2[j-1]+Math.max(0,previous[j-1]),Math.max(previous[j],current[j-1]));previous=current;}return previous[nums2.length];}
}
