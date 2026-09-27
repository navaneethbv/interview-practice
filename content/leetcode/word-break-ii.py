class Solution:
    def wordBreak(self,s,wordDict):
        return self._sentences(s,set(wordDict),0,{})

    def _sentences(self, s, words, i, memo):
        """All ways to split s[i:] into dictionary words, memoized by start index."""
        if i==len(s):return ['']
        if i not in memo:
            memo[i]=[s[i:j]+(' '+tail if tail else '')
                     for j in range(i+1,len(s)+1) if s[i:j] in words
                     for tail in self._sentences(s,words,j,memo)]
        return memo[i]
