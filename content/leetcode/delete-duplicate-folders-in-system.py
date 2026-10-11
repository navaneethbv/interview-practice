from collections import Counter


class Solution:
    def deleteDuplicateFolder(self, paths):
        root = {}
        for path in paths:
            node = root
            for name in path:
                node = node.setdefault(name, {})
        signatures = {}
        counts = Counter()

        def sign(node):
            key = "".join(f"({name}{sign(child)})" for name, child in sorted(node.items()))
            signatures[id(node)] = key
            if key:
                counts[key] += 1
            return key

        sign(root)
        result = []

        def collect(node, path):
            for name, child in node.items():
                key = signatures[id(child)]
                if key and counts[key] > 1:
                    continue
                result.append(path + [name])
                collect(child, path + [name])

        collect(root, [])
        return result
