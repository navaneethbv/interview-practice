class Solution:
    def checkPerfectNumber(self, num):
        if num<=1: return False
        total=1; divisor=2
        while divisor*divisor<=num:
            if num%divisor==0:
                total+=divisor
                if divisor*divisor!=num: total+=num//divisor
            divisor+=1
        return total==num
