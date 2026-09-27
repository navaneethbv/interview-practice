class Solution {
public int concatenatedBinary(int n){long out=0;int bits=0;for(int i=1;i<=n;i++){if((i&(i-1))==0)bits++;out=((out<<bits)+i)%1000000007;}return (int)out;}
}
