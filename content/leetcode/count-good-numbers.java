class Solution {
public int countGoodNumbers(long n){return (int)(power(5,(n+1)/2)*power(4,n/2)%1000000007);}private long power(long base,long exponent){long out=1;while(exponent>0){if((exponent&1)!=0)out=out*base%1000000007;base=base*base%1000000007;exponent>>=1;}return out;}
}
