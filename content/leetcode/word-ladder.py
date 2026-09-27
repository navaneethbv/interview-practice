from collections import deque
class Solution:
    def ladderLength(self, beginWord, endWord, wordList):
        remaining = set(wordList)
        if endWord not in remaining:
            return 0
        remaining.discard(beginWord)
        queue = deque([(beginWord,1)])
        while queue:
            word, distance = queue.popleft()
            for i in range(len(word)):
                for letter in 'abcdefghijklmnopqrstuvwxyz':
                    candidate = word[:i]+letter+word[i+1:]
                    if candidate not in remaining:
                        continue
                    if candidate == endWord:
                        return distance+1
                    remaining.remove(candidate)
                    queue.append((candidate,distance+1))
        return 0
