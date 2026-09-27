class Solution:
    def isStrobogrammatic(self, num):
        rotated_digit = {"0": "0", "1": "1", "8": "8", "6": "9", "9": "6"}
        left = 0
        right = len(num) - 1
        while left <= right:
            if rotated_digit.get(num[left]) != num[right]:
                return False
            left += 1
            right -= 1
        return True
