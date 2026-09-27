class Solution:
    def deleteNode(self, root, key):
        parent = None
        current = root
        while current is not None and current.val != key:
            parent = current
            if key < current.val:
                current = current.left
            else:
                current = current.right

        if current is None:
            return root

        if current.left is not None and current.right is not None:
            successor_parent = current
            successor = current.right
            while successor.left is not None:
                successor_parent = successor
                successor = successor.left
            current.val = successor.val
            parent = successor_parent
            current = successor

        child = current.left if current.left is not None else current.right
        if parent is None:
            return child
        if parent.left is current:
            parent.left = child
        else:
            parent.right = child
        return root
