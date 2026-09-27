class Solution:
    def addOperators(self, num, target):
        expressions = []
        self._search(num, target, 0, "", 0, 0, expressions)
        return expressions

    def _search(self, num, target, index, expression, value, last_operand, expressions):
        if index == len(num):
            if value == target:
                expressions.append(expression)
            return

        for end in range(index + 1, len(num) + 1):
            if end > index + 1 and num[index] == "0":
                break
            token = num[index:end]
            operand = int(token)
            if index == 0:
                self._search(num, target, end, token, operand, operand, expressions)
                continue
            self._search(
                num, target, end, expression + "+" + token,
                value + operand, operand, expressions
            )
            self._search(
                num, target, end, expression + "-" + token,
                value - operand, -operand, expressions
            )
            multiplied_value = value - last_operand + last_operand * operand
            self._search(
                num, target, end, expression + "*" + token,
                multiplied_value, last_operand * operand, expressions
            )
