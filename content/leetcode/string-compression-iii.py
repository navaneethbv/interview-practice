class Solution:
    def compressedString(self,word):
        out=[];i=0
        while i<len(word):
            j=i+1
            while j<len(word) and word[j]==word[i] and j-i<9:j+=1
            out.append(str(j-i)+word[i]);i=j
        return ''.join(out)
