class Solution:
    def deserialize(self, s):
        if s[0] != "[":
            return NestedInteger(int(s))
        stack = []
        index = 0
        while index < len(s):
            character = s[index]
            if character == "[":
                value = NestedInteger()
                if stack:
                    stack[-1].add(value)
                stack.append(value)
                index += 1
            elif character == "]":
                value = stack.pop()
                index += 1
                if not stack:
                    return value
            elif character == ",":
                index += 1
            else:
                value, index = self._read_number(s, index)
                stack[-1].add(NestedInteger(value))

    @staticmethod
    def _read_number(s, index):
        end = index + 1
        while end < len(s) and s[end].isdigit():
            end += 1
        return int(s[index:end]), end
