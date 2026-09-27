class Solution:
    def findSecretWord(self, words, master):
        possible=list(words)
        def matches(a,b): return sum(x==y for x,y in zip(a,b))
        while possible:
            def score(word):
                buckets=[0]*7
                for other in possible: buckets[matches(word,other)]+=1
                return max(buckets)
            word=min(possible,key=score)
            count=master.guess(word)
            if count==6: return
            possible=[other for other in possible if matches(word,other)==count]
