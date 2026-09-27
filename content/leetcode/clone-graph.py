class Solution:
    def cloneGraph(self, node):
        if node is None:
            return None
        copies = {node: Node(node.val)}
        queue = [node]
        for original in queue:
            for neighbor in original.neighbors:
                if neighbor not in copies:
                    copies[neighbor] = Node(neighbor.val)
                    queue.append(neighbor)
                copies[original].neighbors.append(copies[neighbor])
        return copies[node]
