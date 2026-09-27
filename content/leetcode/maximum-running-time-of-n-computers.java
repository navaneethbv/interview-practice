class Solution {
public long maxRunTime(int n,int[] batteries) {long l=0,r=0;for(int b:batteries) r+=b;r/=n;while(l<r) {long m=(l+r+1)/2,available=0;for(int b:batteries) available+=Math.min(b,m);if(available>=n*m) l=m;else r=m-1;}return l;}
}
