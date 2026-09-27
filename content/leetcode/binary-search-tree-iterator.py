class BSTIterator:
    def __init__(self, root):
        self.stack=[]; self._push(root)
    def _push(self, node):
        while node:
            self.stack.append(node); node=node.left
    def next(self):
        node=self.stack.pop(); self._push(node.right); return node.val
    def hasNext(self): return bool(self.stack)
