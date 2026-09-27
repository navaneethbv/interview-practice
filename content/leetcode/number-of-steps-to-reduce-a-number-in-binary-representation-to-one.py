class Solution:
    def numSteps(self, s):
        carry = 0
        steps = 0
        for index in range(len(s) - 1, 0, -1):
            bit = int(s[index]) + carry
            if bit == 1:
                steps += 2
                carry = 1
            else:
                steps += 1
        return steps + carry
