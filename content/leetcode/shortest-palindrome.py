class Solution:
    def shortestPalindrome(self, s):
        combined = s + "#" + s[::-1]
        prefix_lengths = [0] * len(combined)

        for index in range(1, len(combined)):
            matched = prefix_lengths[index - 1]
            while matched and combined[index] != combined[matched]:
                matched = prefix_lengths[matched - 1]
            if combined[index] == combined[matched]:
                matched += 1
            prefix_lengths[index] = matched

        palindrome_length = prefix_lengths[-1]
        return s[palindrome_length:][::-1] + s
