class Solution {
private int bound(int[] a,int t,boolean upper) {int l=0,r=a.length;while(l<r) {int m=(l+r)/2;if(a[m]<t||(upper&&a[m]==t)) l=m+1;else r=m;}return l;}
public int[] searchRange(int[] nums,int target) {int l=bound(nums,target,false);if(l==nums.length||nums[l]!=target) return new int[]{-1,-1};return new int[]{l,bound(nums,target,true)-1};}
}
