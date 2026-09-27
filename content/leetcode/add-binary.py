class Solution:
    def addBinary(self, a, b):
        left_index = len(a) - 1
        right_index = len(b) - 1
        carry = 0
        digits = []
        while left_index >= 0 or right_index >= 0 or carry:
            column_total = carry
            if left_index >= 0:
                column_total += int(a[left_index])
                left_index -= 1
            if right_index >= 0:
                column_total += int(b[right_index])
                right_index -= 1
            digits.append(str(column_total % 2))
            carry = column_total // 2
        return ''.join(reversed(digits))
