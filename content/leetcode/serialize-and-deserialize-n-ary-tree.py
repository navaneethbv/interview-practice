class Codec:
    def serialize(self, root):
        if root is None:
            return '# '
        tokens = []
        stack = [root]
        while stack:
            node = stack.pop()
            tokens.append(str(node.val))
            tokens.append(str(len(node.children)))
            stack.extend(reversed(node.children))
        return ' '.join(tokens) + ' '

    def deserialize(self, data):
        tokens = data.split()
        if not tokens or tokens[0] == '#':
            return None
        root = Node(int(tokens[0]))
        child_count = int(tokens[1])
        parents = [(root, child_count)] if child_count else []
        token_index = 2
        while token_index < len(tokens):
            while parents and parents[-1][1] == 0:
                parents.pop()
            if not parents:
                raise ValueError("Unexpected node after all child slots were filled")
            parent, remaining = parents[-1]
            value = int(tokens[token_index])
            count = int(tokens[token_index + 1])
            token_index += 2
            child = Node(value)
            parent.children.append(child)
            parents[-1] = (parent, remaining - 1)
            if count:
                parents.append((child, count))
        return root
