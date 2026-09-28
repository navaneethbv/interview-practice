from collections import Counter


class Solution:
    def removeDuplicateLetters(self, s):
        remaining = Counter(s)
        stack = []
        used = set()
        for character in s:
            remaining[character] -= 1
            if character in used:
                continue
            self._remove_larger_reusable(stack, used, remaining, character)
            stack.append(character)
            used.add(character)
        return ''.join(stack)

    def _remove_larger_reusable(self, stack, used, remaining, character):
        while stack and stack[-1] > character and remaining[stack[-1]]:
            used.remove(stack.pop())
