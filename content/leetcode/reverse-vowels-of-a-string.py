class Solution:
    def reverseVowels(self, s):
        characters = list(s)
        vowels = set("aeiouAEIOU")
        left = 0
        right = len(characters) - 1

        while left < right:
            if characters[left] not in vowels:
                left += 1
            elif characters[right] not in vowels:
                right -= 1
            else:
                characters[left], characters[right] = (
                    characters[right],
                    characters[left],
                )
                left += 1
                right -= 1

        return "".join(characters)
