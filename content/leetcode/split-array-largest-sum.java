class Solution {
public int splitArray(int[] nums,int k) {int l=Arrays.stream(nums).max().getAsInt(),r=Arrays.stream(nums).sum();while(l<r) {int m=l+(r-l)/2,parts=1,total=0;for(int n:nums) {if(total+n>m) {parts++;total=0;}total+=n;}if(parts<=k) r=m;else l=m+1;}return l;}
}
