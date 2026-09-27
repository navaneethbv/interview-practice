class Solution:
    def reverseStr(self, s, k):
        characters = list(s)

        for start in range(0, len(characters), 2 * k):
            left = start
            right = min(start + k - 1, len(characters) - 1)
            while left < right:
                characters[left], characters[right] = (
                    characters[right], characters[left]
                )
                left += 1
                right -= 1

        return "".join(characters)
