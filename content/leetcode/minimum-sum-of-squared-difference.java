class Solution {
public long minSumSquareDiff(int[] nums1,int[] nums2,int k1,int k2) {int[] d=new int[nums1.length];int max=0;long sum=0,operations=(long)k1+k2;for(int i=0;i<d.length;i++) {d[i]=Math.abs(nums1[i]-nums2[i]);max=Math.max(max,d[i]);sum+=d[i];}if(operations>=sum) return 0;int l=0,r=max;while(l<r) {int m=(l+r)/2;long spent=0;for(int x:d) spent+=Math.max(0,x-m);if(spent<=operations) r=m;else l=m+1;}long spent=0,result=0;for(int x:d) {spent+=Math.max(0,x-l);long value=Math.min(x,l);result+=value*value;}return result-(operations-spent)*(2L*l-1);}
}
