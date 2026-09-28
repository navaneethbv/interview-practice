class Solution:
    def isBalanced(self, s, brackets):
        closer_of = {pair[0]: pair[1] for pair in brackets}
        closers = {pair[1] for pair in brackets}
        expected = []
        for character in s:
            if character in closer_of:
                expected.append(closer_of[character])
            elif character in closers:
                if not expected or expected.pop() != character:
                    return False
        return not expected
