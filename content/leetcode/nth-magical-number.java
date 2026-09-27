class Solution {
private long gcd(long a,long b) {while(b!=0) {long t=a%b;a=b;b=t;}return a;}public int nthMagicalNumber(int n,int a,int b) {long l=Math.min(a,b),r=(long)n*Math.min(a,b),lcm=(long)a*b/gcd(a,b);while(l<r) {long m=(l+r)/2;if(m/a+m/b-m/lcm>=n) r=m;else l=m+1;}return (int)(l%1000000007);}
}
