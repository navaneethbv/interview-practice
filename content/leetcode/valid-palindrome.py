class Solution:
    def isPalindrome(self,s):
        clean=''.join(ch.lower() for ch in s if ch.isalnum())
        return clean==clean[::-1]
