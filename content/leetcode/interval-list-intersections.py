class Solution:
    def intervalIntersection(self, firstList, secondList):
        i=j=0;out=[]
        while i<len(firstList) and j<len(secondList):
            a,b=firstList[i];c,d=secondList[j];left,right=max(a,c),min(b,d)
            if left<=right:out.append([left,right])
            if b<d:i+=1
            else:j+=1
        return out
