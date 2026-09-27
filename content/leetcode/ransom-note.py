from collections import Counter

class Solution:
    def canConstruct(self, ransomNote, magazine):
        required_letters = Counter(ransomNote)
        available_letters = Counter(magazine)
        return not (required_letters - available_letters)
