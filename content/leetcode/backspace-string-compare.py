class Solution:
    def backspaceCompare(self, s, t):
        def typed(text):
            typed_characters = []
            for character in text:
                if character == '#':
                    if typed_characters:
                        typed_characters.pop()
                else:
                    typed_characters.append(character)
            return typed_characters

        return typed(s)==typed(t)
