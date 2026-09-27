class Solution:
    def areSentencesSimilarTwo(self, sentence1, sentence2, similarPairs):
        parent = {}
        size = {}

        def find(word):
            parent.setdefault(word, word)
            size.setdefault(word, 1)
            root = word
            while parent[root] != root:
                root = parent[root]
            while parent[word] != word:
                next_word = parent[word]
                parent[word] = root
                word = next_word
            return root

        def union(first, second):
            first_root = find(first)
            second_root = find(second)
            if first_root == second_root:
                return
            if size[first_root] < size[second_root]:
                first_root, second_root = second_root, first_root
            parent[second_root] = first_root
            size[first_root] += size[second_root]

        for first, second in similarPairs:
            union(first, second)
        if len(sentence1) != len(sentence2):
            return False
        return all(find(first) == find(second) for first, second in zip(sentence1, sentence2))
