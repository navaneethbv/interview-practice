class WordDictionary:
    def __init__(self):
        self.root = {}

    def addWord(self, word):
        node = self.root
        for character in word:
            node = node.setdefault(character, {})
        node['$'] = True

    def search(self, word):
        nodes = [self.root]
        for character in word:
            if character == '.':
                nodes = [child for node in nodes for key, child in node.items() if key != '$']
            else:
                nodes = [node[character] for node in nodes if character in node]
        return any('$' in node for node in nodes)
