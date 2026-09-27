from collections import defaultdict
class Solution:
    def findLadders(self, beginWord, endWord, wordList):
        remaining=set(wordList)
        if endWord not in remaining:return []
        parents=defaultdict(list);level={beginWord};remaining.discard(beginWord)
        while level and endWord not in level:
            next_level=set()
            for word in level:
                for i in range(len(word)):
                    for letter in 'abcdefghijklmnopqrstuvwxyz':
                        candidate=word[:i]+letter+word[i+1:]
                        if candidate in remaining:parents[candidate].append(word);next_level.add(candidate)
            remaining-=next_level;level=next_level
        out=[]
        def build(word,path):
            if word==beginWord:out.append(path[::-1]);return
            for previous in parents[word]:build(previous,path+[previous])
        if endWord in level:build(endWord,[endWord])
        return out
