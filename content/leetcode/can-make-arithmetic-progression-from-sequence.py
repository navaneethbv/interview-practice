class Solution:
    def canMakeArithmeticProgression(self,arr):
        a=sorted(arr);return all(a[i]-a[i-1]==a[1]-a[0] for i in range(2,len(a)))
