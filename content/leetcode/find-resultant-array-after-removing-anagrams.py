class Solution:
    def removeAnagrams(self, words):
        out=[];previous=None
        for word in words:
            signature=''.join(sorted(word))
            if signature!=previous:out.append(word);previous=signature
        return out
