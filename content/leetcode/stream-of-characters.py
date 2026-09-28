from collections import deque


class StreamChecker:
    def __init__(self, words):
        self.root = {}
        self.stream = deque(maxlen=max(map(len, words)))
        for word in words:
            node = self.root
            for letter in reversed(word):
                node = node.setdefault(letter, {})
            node['$'] = True

    def query(self, letter):
        self.stream.append(letter)
        node = self.root
        for character in reversed(self.stream):
            if character not in node:
                return False
            node = node[character]
            if '$' in node:
                return True
        return False
