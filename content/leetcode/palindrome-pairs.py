class Solution:
    def palindromePairs(self, words):
        index={word:i for i,word in enumerate(words)};out=set()
        for i,word in enumerate(words):
            for split in range(len(word)+1):
                left,right=word[:split],word[split:]
                if left==left[::-1]:
                    j=index.get(right[::-1])
                    if j is not None and j!=i:out.add((j,i))
                if right==right[::-1]:
                    j=index.get(left[::-1])
                    if j is not None and j!=i:out.add((i,j))
        return [list(pair) for pair in sorted(out)]
