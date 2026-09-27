class Solution:
    def uniqueMorseRepresentations(self, words):
        codes=['.-','-...','-.-.','-..','.','..-.','--.','....','..','.---','-.-','.-..','--','-.','---','.--.','--.-','.-.','...','-','..-','...-','.--','-..-','-.--','--..']
        return len({''.join(codes[ord(c)-97] for c in word) for word in words})
