from collections import defaultdict


class Solution:
    def findLadders(self, beginWord, endWord, wordList):
        remaining_words = set(wordList)
        if endWord not in remaining_words:
            return []

        parents = defaultdict(list)
        current_level = {beginWord}
        remaining_words.discard(beginWord)

        while current_level and endWord not in current_level:
            next_level = self._expand(current_level, remaining_words, parents)
            remaining_words -= next_level
            current_level = next_level

        paths = []
        if endWord in current_level:
            self._build_paths(parents, beginWord, endWord, [endWord], paths)
        return paths

    def _expand(self, current_level, remaining_words, parents):
        next_level = set()
        for word in current_level:
            for position in range(len(word)):
                for letter in "abcdefghijklmnopqrstuvwxyz":
                    candidate = (
                        word[:position] + letter + word[position + 1:]
                    )
                    if candidate in remaining_words:
                        parents[candidate].append(word)
                        next_level.add(candidate)
        return next_level

    def _build_paths(self, parents, beginWord, word, reversed_path, paths):
        if word == beginWord:
            paths.append(reversed_path[::-1])
            return

        for parent in parents[word]:
            reversed_path.append(parent)
            self._build_paths(parents, beginWord, parent, reversed_path, paths)
            reversed_path.pop()
