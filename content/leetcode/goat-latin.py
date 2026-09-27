class Solution:
    def toGoatLatin(self, sentence):
        out=[]
        for i,word in enumerate(sentence.split(),1):
            if word[0].lower() not in 'aeiou':word=word[1:]+word[0]
            out.append(word+'ma'+'a'*i)
        return ' '.join(out)
