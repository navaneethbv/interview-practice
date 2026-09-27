class Solution {
private long gcd(long a,long b) {while(b!=0) {long t=a%b;a=b;b=t;}return a;}public long minimumTime(int[] d,int[] r) {long l=0,right=2L*(d[0]+(long)d[1]),lcm=(long)r[0]*r[1]/gcd(r[0],r[1]);while(l<right) {long m=(l+right)/2;if(m-m/r[0]>=d[0]&&m-m/r[1]>=d[1]&&m-m/lcm>=d[0]+(long)d[1]) right=m;else l=m+1;}return l;}
}
