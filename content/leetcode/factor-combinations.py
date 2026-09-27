from math import isqrt
class Solution:
    def getFactors(self,n):
        result=[]
        def visit(value,start,path):
            for factor in range(start,isqrt(value)+1):
                if value%factor==0:
                    result.append(path+[factor,value//factor]);visit(value//factor,factor,path+[factor])
        visit(n,2,[]);return result
