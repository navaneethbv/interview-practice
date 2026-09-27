from collections import Counter
class Solution:
    def queryResults(self,_limit,queries):
        balls={};counts=Counter();result=[]
        for ball,color in queries:
            if ball in balls:
                old=balls[ball];counts[old]-=1
                if counts[old]==0:del counts[old]
            balls[ball]=color;counts[color]+=1;result.append(len(counts))
        return result
