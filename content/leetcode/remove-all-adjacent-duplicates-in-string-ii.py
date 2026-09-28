class Solution:
    def removeDuplicates(self, s, k):
        stack = []
        for character in s:
            if stack and stack[-1][0] == character:
                stack[-1][1] += 1
            else:
                stack.append([character, 1])
            if stack[-1][1] == k:
                stack.pop()
        return "".join(character * count for character, count in stack)
