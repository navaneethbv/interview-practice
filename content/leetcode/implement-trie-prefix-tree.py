class Trie:
    def __init__(self):
        self.root = {}

    def insert(self, word):
        node = self.root
        for character in word:
            node = node.setdefault(character, {})
        node['$'] = True

    def _walk(self, word):
        node = self.root
        for character in word:
            if character not in node:
                return None
            node = node[character]
        return node

    def search(self, word):
        node = self._walk(word)
        return node is not None and '$' in node

    def startsWith(self, prefix):
        return self._walk(prefix) is not None
