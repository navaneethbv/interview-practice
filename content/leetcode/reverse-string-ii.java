class Solution {
public String reverseStr(String s,int k){char[]a=s.toCharArray();for(int start=0;start<a.length;start+=2*k)for(int l=start,r=Math.min(a.length-1,start+k-1);l<r;l++,r--){char t=a[l];a[l]=a[r];a[r]=t;}return new String(a);}
}
