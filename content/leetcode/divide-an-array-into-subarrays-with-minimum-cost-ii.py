from bisect import bisect_left
class Solution:
 def minimumCost(self,nums,k,dist):
  values=sorted(set(nums[1:]));size=len(values);counts=[0]*(size+1);sums=[0]*(size+1)
  def update(x,delta):
   i=bisect_left(values,x)+1
   while i<=size:counts[i]+=delta;sums[i]+=delta*x;i+=i&-i
  def smallest(need):
   pos=0;total=0;step=1<<(size.bit_length()-1)
   while step:
    nxt=pos+step
    if nxt<=size and counts[nxt]<need:need-=counts[nxt];total+=sums[nxt];pos=nxt
    step//=2
   return total+need*values[pos]
  width=dist+1
  for x in nums[1:width+1]:update(x,1)
  best=smallest(k-1)
  for right in range(width+1,len(nums)):
   update(nums[right-width],-1);update(nums[right],1);best=min(best,smallest(k-1))
  return nums[0]+best
