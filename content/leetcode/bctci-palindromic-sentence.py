class Solution:
    def isPalindromicSentence(self, s):
        left, right = 0, len(s) - 1
        while left < right:
            if not self._is_letter(s[left]):
                left += 1
            elif not self._is_letter(s[right]):
                right -= 1
            elif s[left].lower() != s[right].lower():
                return False
            else:
                left += 1
                right -= 1
        return True

    def _is_letter(self, character):
        return "a" <= character.lower() <= "z"
