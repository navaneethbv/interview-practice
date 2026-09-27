from functools import cmp_to_key
class Solution:
    def largestNumber(self, nums):
        strings = list(map(str, nums))

        def compare(first, second):
            if first + second > second + first:
                return -1
            if first + second < second + first:
                return 1
            return 0

        strings.sort(key=cmp_to_key(compare))
        result = ''.join(strings).lstrip('0')
        return result or '0'
