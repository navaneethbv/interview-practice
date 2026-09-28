class Solution:
    def sortStack(self, stack):
        source = list(stack)
        ordered = []
        while source:
            value = source.pop()
            while ordered and ordered[-1] < value:
                source.append(ordered.pop())
            ordered.append(value)
        return ordered
