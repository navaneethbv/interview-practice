class Solution:
    def recoverTree(self, root):
        stack=[];previous=first=second=None;node=root
        while node or stack:
            while node:stack.append(node);node=node.left
            node=stack.pop()
            if previous and previous.val>node.val:
                if first is None:first=previous
                second=node
            previous=node;node=node.right
        first.val,second.val=second.val,first.val
