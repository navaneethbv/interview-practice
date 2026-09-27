class Solution:
    def singleNumber(self, nums):
        result=0
        for bit in range(32):
            if sum((x>>bit)&1 for x in nums)%3:result|=1<<bit
        return result if result<1<<31 else result-(1<<32)
