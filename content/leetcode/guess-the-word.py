class Solution:
    def findSecretWord(self, words, master):
        def matches(a,b): return sum(x==y for x,y in zip(a,b))
        def worst_bucket(word,candidates):
            buckets=[0]*7
            for other in candidates: buckets[matches(word,other)]+=1
            return max(buckets)
        possible=list(words)
        while possible:
            word=min(possible,key=lambda candidate:worst_bucket(candidate,possible))
            count=master.guess(word)
            if count==6: return
            possible=[other for other in possible if matches(word,other)==count]
