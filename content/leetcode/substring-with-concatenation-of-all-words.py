from collections import Counter
class Solution:
    def findSubstring(self,s,words):
        w=len(words[0]);need=Counter(words);result=[]
        for offset in range(w):
            counts=Counter();left=offset;used=0
            for right in range(offset,len(s)-w+1,w):
                word=s[right:right+w]
                if word not in need:counts.clear();used=0;left=right+w;continue
                counts[word]+=1;used+=1
                while counts[word]>need[word]:counts[s[left:left+w]]-=1;left+=w;used-=1
                if used==len(words):result.append(left)
        return result
