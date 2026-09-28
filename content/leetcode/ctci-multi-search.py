class Solution:
    def multiSearch(self, big, smalls):
        trie = {}
        for index, small in enumerate(smalls):
            node = trie
            for letter in small:
                node = node.setdefault(letter, {})
            node.setdefault("$", []).append(index)
        positions = [[] for _ in smalls]
        for start in range(len(big)):
            node = trie
            for letter in big[start:]:
                if letter not in node:
                    break
                node = node[letter]
                for index in node.get("$", []):
                    positions[index].append(start)
        return positions
