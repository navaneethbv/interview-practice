class Solution:
    def findSecretWord(self, words, master):
        possible=list(words)
        while possible:
            # Guess the word whose worst-case response leaves the fewest candidates.
            worst={word:self._worst_bucket(word,possible) for word in possible}
            word=min(possible,key=worst.__getitem__)
            count=master.guess(word)
            if count==6: return
            possible=[other for other in possible if self._matches(word,other)==count]

    @staticmethod
    def _matches(a,b):
        return sum(x==y for x,y in zip(a,b))

    def _worst_bucket(self, word, candidates):
        buckets=[0]*7
        for other in candidates: buckets[self._matches(word,other)]+=1
        return max(buckets)
