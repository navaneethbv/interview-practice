from collections import defaultdict
class Solution:
    def findLadders(self, beginWord, endWord, wordList):
        remaining=set(wordList)
        if endWord not in remaining:return []
        parents=defaultdict(list);level={beginWord};remaining.discard(beginWord)
        while level and endWord not in level:
            level=self._expand(level,remaining,parents);remaining-=level
        out=[]
        if endWord in level:self._build(parents,beginWord,endWord,[endWord],out)
        return out

    def _expand(self, level, remaining, parents):
        """Next BFS level, recording every shortest-path parent of each new word."""
        next_level=set()
        for word in level:
            for i in range(len(word)):
                for letter in 'abcdefghijklmnopqrstuvwxyz':
                    candidate=word[:i]+letter+word[i+1:]
                    if candidate in remaining:parents[candidate].append(word);next_level.add(candidate)
        return next_level

    def _build(self, parents, begin, word, path, out):
        if word==begin:out.append(path[::-1]);return
        for previous in parents[word]:self._build(parents,begin,previous,path+[previous],out)
