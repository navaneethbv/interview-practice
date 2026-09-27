from collections import deque


class Solution:
    def ladderLength(self, beginWord, endWord, wordList):
        remaining_words = set(wordList)
        if endWord not in remaining_words:
            return 0

        remaining_words.discard(beginWord)
        queue = deque([(beginWord, 1)])

        while queue:
            word, distance = queue.popleft()
            for index in range(len(word)):
                for letter in 'abcdefghijklmnopqrstuvwxyz':
                    candidate = word[:index] + letter + word[index + 1:]
                    if candidate not in remaining_words:
                        continue
                    if candidate == endWord:
                        return distance + 1
                    remaining_words.remove(candidate)
                    queue.append((candidate, distance + 1))

        return 0
