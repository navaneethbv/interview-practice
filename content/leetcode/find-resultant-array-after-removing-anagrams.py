class Solution:
    def removeAnagrams(self, words):
        result = []
        previous_signature = None
        for word in words:
            signature = ''.join(sorted(word))
            if signature != previous_signature:
                result.append(word)
                previous_signature = signature
        return result
