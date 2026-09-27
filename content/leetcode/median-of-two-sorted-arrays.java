class Solution {
public double findMedianSortedArrays(int[] nums1,int[] nums2) {
    if(nums1.length>nums2.length) return findMedianSortedArrays(nums2,nums1);
    int m=nums1.length,n=nums2.length,l=0,r=m;
    while(l<=r) {int i=(l+r)/2,j=(m+n+1)/2-i;
        int a=i==0?Integer.MIN_VALUE:nums1[i-1],b=i==m?Integer.MAX_VALUE:nums1[i];
        int c=j==0?Integer.MIN_VALUE:nums2[j-1],d=j==n?Integer.MAX_VALUE:nums2[j];
        if(a<=d&&c<=b) {if((m+n)%2==1) return Math.max(a,c);return (Math.max(a,c)+(double)Math.min(b,d))/2;}
        if(a>d) r=i-1;else l=i+1;
    }
    throw new IllegalArgumentException();
}
}
