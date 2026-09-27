class Solution:
 def maximumDetonation(self,bombs):
  g=[[] for _ in bombs]
  for i,(x,y,r) in enumerate(bombs):
   for j,(a,b,_) in enumerate(bombs):
    if (x-a)**2+(y-b)**2<=r*r:g[i].append(j)
  ans=0
  for start in range(len(bombs)):
   seen={start};stack=[start]
   while stack:
    for v in g[stack.pop()]:
     if v not in seen:seen.add(v);stack.append(v)
   ans=max(ans,len(seen))
  return ans
