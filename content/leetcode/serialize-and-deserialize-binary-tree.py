from collections import deque
class Codec:
    def serialize(self,root):
        q=deque([root])
        values=[]
        while q:
            node=q.popleft()
            if node:
                values.append(str(node.val))
                q.extend((node.left,node.right))
            else: values.append('#')
        return ','.join(values)
    def deserialize(self,data):
        values=iter(data.split(','))
        first=next(values)
        if first=='#': return None
        root=TreeNode(int(first))
        q=deque([root])
        while q:
            node=q.popleft()
            for side in ('left','right'):
                value=next(values)
                if value!='#':
                    child=TreeNode(int(value))
                    setattr(node,side,child)
                    q.append(child)
        return root
