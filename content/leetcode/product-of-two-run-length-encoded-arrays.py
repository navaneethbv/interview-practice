class Solution:
    def findRLEArray(self, encoded1, encoded2):
        i=j=0;a=encoded1[0][1];b=encoded2[0][1];out=[]
        while i<len(encoded1):
            count=min(a,b);value=encoded1[i][0]*encoded2[j][0]
            if out and out[-1][0]==value:out[-1][1]+=count
            else:out.append([value,count])
            a-=count;b-=count
            if a==0:
                i+=1
                if i<len(encoded1):a=encoded1[i][1]
            if b==0:
                j+=1
                if j<len(encoded2):b=encoded2[j][1]
        return out
