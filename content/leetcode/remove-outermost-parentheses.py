class Solution:
    def removeOuterParentheses(self, s):
        depth = 0
        result = []
        for character in s:
            if character == ")":
                depth -= 1
            if depth:
                result.append(character)
            if character == "(":
                depth += 1
        return "".join(result)
