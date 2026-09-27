class Solution:
    def fractionToDecimal(self, numerator, denominator):
        if numerator==0: return '0'
        sign='-' if (numerator<0)!=(denominator<0) else ''
        n,d=abs(numerator),abs(denominator); whole,remainder=divmod(n,d)
        result=sign+str(whole)
        if not remainder: return result
        digits=[]; seen={}
        while remainder and remainder not in seen:
            seen[remainder]=len(digits); digit,remainder=divmod(remainder*10,d); digits.append(str(digit))
        if remainder:
            start=seen[remainder]; digits.insert(start,'('); digits.append(')')
        return result+'.'+''.join(digits)
