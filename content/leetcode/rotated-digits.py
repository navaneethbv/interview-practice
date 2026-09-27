class Solution:
 def rotatedDigits(self,n):return sum(not(set(str(v))&set('347')) and bool(set(str(v))&set('2569')) for v in range(1,n+1))
