class Solution:
    def minimumBoxes(self,apple,capacity):
        remaining=sum(apple)
        for i,size in enumerate(sorted(capacity,reverse=True),1):
            remaining-=size
            if remaining<=0:return i
