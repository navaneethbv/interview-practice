class Solution:
 def numberOfStableArrays(self,zero,one,limit):
  mod=1000000007;a=[[0]*(one+1) for _ in range(zero+1)];b=[[0]*(one+1) for _ in range(zero+1)]
  for i in range(1,min(zero,limit)+1):a[i][0]=1
  for j in range(1,min(one,limit)+1):b[0][j]=1
  for i in range(1,zero+1):
   for j in range(1,one+1):
    a[i][j]=(a[i-1][j]+b[i-1][j]-(b[i-limit-1][j] if i>limit else 0))%mod
    b[i][j]=(a[i][j-1]+b[i][j-1]-(a[i][j-limit-1] if j>limit else 0))%mod
  return (a[zero][one]+b[zero][one])%mod
