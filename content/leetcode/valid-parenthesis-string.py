class Solution:
    def checkValidString(self, s):
        minimum_open = 0
        maximum_open = 0
        for character in s:
            if character == "(":
                minimum_open += 1
                maximum_open += 1
            elif character == ")":
                minimum_open -= 1
                maximum_open -= 1
            else:
                minimum_open -= 1
                maximum_open += 1

            if maximum_open < 0:
                return False
            minimum_open = max(minimum_open, 0)
        return minimum_open == 0
