class Solution {
public int nthSuperUglyNumber(int n,int[] primes){long[] a=new long[n];a[0]=1;int[] p=new int[primes.length];for(int i=1;i<n;i++){long v=Long.MAX_VALUE;for(int j=0;j<p.length;j++)v=Math.min(v,(long)primes[j]*a[p[j]]);a[i]=v;for(int j=0;j<p.length;j++)if((long)primes[j]*a[p[j]]==v)p[j]++;}return (int)a[n-1];}
}
