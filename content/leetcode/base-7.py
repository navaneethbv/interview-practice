class Solution:
    def convertToBase7(self, num):
        if num==0: return '0'
        negative=num<0; num=abs(num); digits=[]
        while num: num,digit=divmod(num,7); digits.append(str(digit))
        return ('-' if negative else '')+''.join(reversed(digits))
