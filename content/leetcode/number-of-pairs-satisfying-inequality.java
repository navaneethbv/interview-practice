class Solution {
public long numberOfPairs(int[] nums1,int[] nums2,int diff){int n=nums1.length;int[] a=new int[n],sorted=new int[n];for(int i=0;i<n;i++)a[i]=sorted[i]=nums1[i]-nums2[i];Arrays.sort(sorted);int[] bit=new int[n+1];long ans=0;for(int v:a){int l=0,r=n;while(l<r){int m=(l+r)/2;if(sorted[m]<=v+diff)l=m+1;else r=m;}for(int i=l;i>0;i-=i&-i)ans+=bit[i];l=0;r=n;while(l<r){int m=(l+r)/2;if(sorted[m]<v)l=m+1;else r=m;}for(int i=l+1;i<=n;i+=i&-i)bit[i]++;}return ans;}
}
