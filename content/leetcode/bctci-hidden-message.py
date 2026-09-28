class Solution:
    def hiddenMessage(self, root, texts):
        parts = []

        def read(node):
            if node is None:
                return
            order, letter = texts[node.val][0], texts[node.val][1]
            if order == "b":
                parts.append(letter)
            read(node.left)
            if order == "i":
                parts.append(letter)
            read(node.right)
            if order == "a":
                parts.append(letter)

        read(root)
        return "".join(parts)
