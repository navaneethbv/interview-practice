import re
class Solution:
    def isNumber(self, s):
        base,marker,exponent=s.lower().partition('e')
        if marker and not re.fullmatch(r'[+-]?\d+',exponent,re.ASCII):return False
        return re.fullmatch(r'[+-]?(?:\d+\.?\d*|\.\d+)',base,re.ASCII) is not None
