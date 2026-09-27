class Solution:
    def minRemoveToMakeValid(self, s):
        unmatched_open = []
        remove = set()
        for index, character in enumerate(s):
            if character == '(':
                unmatched_open.append(index)
            elif character == ')':
                if unmatched_open:
                    unmatched_open.pop()
                else:
                    remove.add(index)
        remove.update(unmatched_open)
        return ''.join(character for index, character in enumerate(s) if index not in remove)
