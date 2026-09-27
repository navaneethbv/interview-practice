class Solution:
    def palindromePairs(self, words):
        index={word:i for i,word in enumerate(words)};out=set()
        for i,word in enumerate(words):
            for split in range(len(word)+1):
                left,right=word[:split],word[split:]
                # A palindromic prefix can follow the reversed suffix; a palindromic suffix can precede the reversed prefix.
                if left==left[::-1]:self._record(out,index.get(right[::-1]),i,True)
                if right==right[::-1]:self._record(out,index.get(left[::-1]),i,False)
        return [list(pair) for pair in sorted(out)]

    @staticmethod
    def _record(out, j, i, j_first):
        if j is not None and j!=i:out.add((j,i) if j_first else (i,j))
