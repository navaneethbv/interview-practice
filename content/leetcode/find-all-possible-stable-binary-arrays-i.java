class Solution {
public int numberOfStableArrays(int zero,int one,int limit){long mod=1000000007;long[][] a=new long[zero+1][one+1],b=new long[zero+1][one+1];for(int i=1;i<=Math.min(zero,limit);i++)a[i][0]=1;for(int j=1;j<=Math.min(one,limit);j++)b[0][j]=1;for(int i=1;i<=zero;i++)for(int j=1;j<=one;j++){a[i][j]=(a[i-1][j]+b[i-1][j]-(i>limit?b[i-limit-1][j]:0)+mod)%mod;b[i][j]=(a[i][j-1]+b[i][j-1]-(j>limit?a[i][j-limit-1]:0)+mod)%mod;}return (int)((a[zero][one]+b[zero][one])%mod);
}
}
