class Solution:
    def replaceWords(self,dictionary,sentence):
        roots=set(dictionary);result=[]
        for word in sentence.split():
            for i in range(1,len(word)+1):
                if word[:i] in roots:word=word[:i];break
            result.append(word)
        return ' '.join(result)
