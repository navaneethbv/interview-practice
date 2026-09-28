class Solution:
    def uniqueMorseRepresentations(self, words):
        codes = [
            ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....",
            "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.",
            "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-",
            "-.--", "--.."
        ]
        representations = set()
        for word in words:
            encoded = []
            for character in word:
                encoded.append(codes[ord(character) - ord('a')])
            representations.add(''.join(encoded))
        return len(representations)
