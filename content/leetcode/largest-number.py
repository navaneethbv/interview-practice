from functools import cmp_to_key
class Solution:
    def largestNumber(self, nums):
        strings=list(map(str,nums))
        strings.sort(key=cmp_to_key(lambda a,b:(b+a>a+b)-(b+a<a+b)))
        return ''.join(strings).lstrip('0') or '0'
