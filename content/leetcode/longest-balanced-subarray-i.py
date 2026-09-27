class Solution:
 def longestBalanced(self,nums):
  n=len(nums);mn=[0]*(4*n);mx=[0]*(4*n);lazy=[0]*(4*n)
  def apply(v,x):mn[v]+=x;mx[v]+=x;lazy[v]+=x
  def push(v):
   if lazy[v]:apply(v*2,lazy[v]);apply(v*2+1,lazy[v]);lazy[v]=0
  def update(v,l,r,a,b,x):
   if a<=l and r<=b:apply(v,x);return
   push(v);m=(l+r)//2
   if a<=m:update(v*2,l,m,a,b,x)
   if b>m:update(v*2+1,m+1,r,a,b,x)
   mn[v]=min(mn[v*2],mn[v*2+1]);mx[v]=max(mx[v*2],mx[v*2+1])
  def first(v,l,r,end):
   if l>end or mn[v]>0 or mx[v]<0:return n
   if l==r:return l
   push(v);m=(l+r)//2;ans=first(v*2,l,m,end)
   return ans if ans<n else first(v*2+1,m+1,r,end)
  last={};ans=0
  for i,x in enumerate(nums):
   update(1,0,n-1,last.get(x,-1)+1,i,1 if x%2==0 else -1);last[x]=i
   start=first(1,0,n-1,i)
   if start<=i:ans=max(ans,i-start+1)
  return ans
