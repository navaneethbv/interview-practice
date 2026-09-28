class Solution:
    def toLowerCase(self, s):
        result = []
        for character in s:
            if 'A' <= character <= 'Z':
                result.append(chr(ord(character) + 32))
            else:
                result.append(character)
        return ''.join(result)
