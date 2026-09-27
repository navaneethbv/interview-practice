class Solution {
public int nextGreaterElement(int n) {char[] d=Integer.toString(n).toCharArray();int p=d.length-2;while(p>=0&&d[p]>=d[p+1]) p--;if(p<0) return -1;int s=d.length-1;while(d[s]<=d[p]) s--;char t=d[p];d[p]=d[s];d[s]=t;for(int l=p+1,r=d.length-1;l<r;l++,r--) {t=d[l];d[l]=d[r];d[r]=t;}long value=Long.parseLong(new String(d));return value<=Integer.MAX_VALUE?(int)value:-1;}
}
