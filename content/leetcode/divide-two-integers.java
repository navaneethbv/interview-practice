class Solution {
public int divide(int dividend,int divisor){long a=Math.abs((long)dividend),b=Math.abs((long)divisor),out=0;for(int i=31;i>=0;i--)if((b<<i)<=a){a-=b<<i;out|=1L<<i;}if((dividend<0)!=(divisor<0))out=-out;return (int)Math.min(Integer.MAX_VALUE,Math.max(Integer.MIN_VALUE,out));}
}
