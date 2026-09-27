class Codec:
    def serialize(self, root):
        values = []
        stack = [root] if root else []
        while stack:
            node = stack.pop()
            values.append(str(node.val))
            if node.right:
                stack.append(node.right)
            if node.left:
                stack.append(node.left)
        return ",".join(values)

    def deserialize(self, data):
        if not data:
            return None
        values = [int(value) for value in data.split(",")]
        root = TreeNode(values[0])
        stack = [root]
        for value in values[1:]:
            node = TreeNode(value)
            if value < stack[-1].val:
                stack[-1].left = node
            else:
                parent = None
                while stack and stack[-1].val < value:
                    parent = stack.pop()
                parent.right = node
            stack.append(node)
        return root
