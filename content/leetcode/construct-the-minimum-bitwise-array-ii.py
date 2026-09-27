class Solution:
    def minBitwiseArray(self, nums):
        result=[]
        for value in nums:
            if value==2: result.append(-1); continue
            bit=1
            while value&bit: bit<<=1
            result.append(value-(bit>>1))
        return result
