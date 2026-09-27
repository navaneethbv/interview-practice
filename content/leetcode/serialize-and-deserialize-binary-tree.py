from collections import deque


class Codec:
    def serialize(self, root):
        queue = deque([root])
        values = []
        while queue:
            node = queue.popleft()
            if node:
                values.append(str(node.val))
                queue.extend((node.left, node.right))
            else:
                values.append('#')
        return ','.join(values)

    def deserialize(self, data):
        values = iter(data.split(','))
        first = next(values)
        if first == '#':
            return None
        root = TreeNode(int(first))
        queue = deque([root])
        while queue:
            node = queue.popleft()
            for side in ('left', 'right'):
                value = next(values)
                if value != '#':
                    child = TreeNode(int(value))
                    setattr(node, side, child)
                    queue.append(child)
        return root
