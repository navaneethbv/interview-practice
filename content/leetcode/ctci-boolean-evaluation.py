from functools import cache


class Solution:
    def countEval(self, expression, result):
        @cache
        def ways(start, end):
            if start == end:
                value = expression[start] == "1"
                return (1, 0) if value else (0, 1)
            true_count = false_count = 0
            for split in range(start + 1, end, 2):
                left_true, left_false = ways(start, split - 1)
                right_true, right_false = ways(split + 1, end)
                total = (left_true + left_false) * (right_true + right_false)
                operator = expression[split]
                if operator == "&":
                    produced_true = left_true * right_true
                elif operator == "|":
                    produced_true = total - left_false * right_false
                else:
                    produced_true = left_true * right_false + left_false * right_true
                true_count += produced_true
                false_count += total - produced_true
            return true_count, false_count

        true_count, false_count = ways(0, len(expression) - 1)
        return true_count if result else false_count
