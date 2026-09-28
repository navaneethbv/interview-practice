class Solution:
    def longestBalanced(self, s):
        keep = [False] * len(s)
        openers = []
        for index, character in enumerate(s):
            if character == "(":
                openers.append(index)
            elif openers:
                keep[openers.pop()] = True
                keep[index] = True
        return "".join(character for index, character in enumerate(s) if keep[index])
