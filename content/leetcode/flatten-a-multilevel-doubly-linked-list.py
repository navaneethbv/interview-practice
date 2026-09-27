class Solution:
    def flatten(self, head):
        stack=[head] if head else []; previous=None
        while stack:
            node=stack.pop()
            if node.next: stack.append(node.next)
            if node.child: stack.append(node.child)
            node.prev=previous; node.child=None
            if previous: previous.next=node
            previous=node
        if previous: previous.next=None
        return head
