class Solution:
    def isStrictlyPalindromic(self, n):
        # For n >= 5, base n - 2 writes n as 12, which is not a palindrome.
        # The only smaller candidate n = 4 is 100 in base 2.
        return False
