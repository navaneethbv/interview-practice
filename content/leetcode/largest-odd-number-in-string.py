class Solution:
    def largestOddNumber(self, num):
        for index in range(len(num) - 1, -1, -1):
            if int(num[index]) % 2 == 1:
                return num[:index + 1]
        return ''
