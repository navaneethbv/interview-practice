class _RangeAddTree:
    """Range add over positions 0..n-1, tracking min and max to find the leftmost zero."""
    def __init__(self, n):
        self.n=n;self.mn=[0]*(4*n);self.mx=[0]*(4*n);self.lazy=[0]*(4*n)

    def _apply(self, v, x):
        self.mn[v]+=x;self.mx[v]+=x;self.lazy[v]+=x

    def _push(self, v):
        if self.lazy[v]:self._apply(v*2,self.lazy[v]);self._apply(v*2+1,self.lazy[v]);self.lazy[v]=0

    def update(self, v, l, r, a, b, x):
        if a<=l and r<=b:self._apply(v,x);return
        self._push(v);m=(l+r)//2
        if a<=m:self.update(v*2,l,m,a,b,x)
        if b>m:self.update(v*2+1,m+1,r,a,b,x)
        self.mn[v]=min(self.mn[v*2],self.mn[v*2+1]);self.mx[v]=max(self.mx[v*2],self.mx[v*2+1])

    def first_zero(self, v, l, r, end):
        """Leftmost index at or before end holding zero, or n."""
        if l>end or self.mn[v]>0 or self.mx[v]<0:return self.n
        if l==r:return l
        self._push(v);m=(l+r)//2;ans=self.first_zero(v*2,l,m,end)
        return ans if ans<self.n else self.first_zero(v*2+1,m+1,r,end)

class Solution:
 def longestBalanced(self,nums):
  n=len(nums);tree=_RangeAddTree(n);last={};ans=0
  for i,x in enumerate(nums):
   # Each distinct value counts once per start: adjust starts since its previous occurrence.
   tree.update(1,0,n-1,last.get(x,-1)+1,i,1 if x%2==0 else -1);last[x]=i
   start=tree.first_zero(1,0,n-1,i)
   if start<=i:ans=max(ans,i-start+1)
  return ans
