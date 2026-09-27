class Solution {
public int minOperations(String s,int k){int n=s.length(),z=0;for(char c:s.toCharArray())if(c=='0')z++;if(z==0)return 0;for(int m=1;m<=n;m++){long flips=(long)m*k,capacity=(long)n*m-(m%2==0?z:n-z);if(flips>=z&&(flips-z)%2==0&&flips<=capacity)return m;}return -1;}
}
