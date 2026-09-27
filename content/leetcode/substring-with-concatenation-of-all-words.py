from collections import Counter
class Solution:
    def findSubstring(self, s, words):
        word_length = len(words[0])
        required = Counter(words)
        result = []
        for offset in range(word_length):
            counts = Counter()
            left = offset
            used = 0
            for right in range(offset, len(s) - word_length + 1, word_length):
                word = s[right:right + word_length]
                if word not in required:
                    counts.clear()
                    used = 0
                    left = right + word_length
                    continue
                counts[word] += 1
                used += 1
                while counts[word] > required[word]:
                    removed = s[left:left + word_length]
                    counts[removed] -= 1
                    left += word_length
                    used -= 1
                if used == len(words):
                    result.append(left)
        return result
