class Solution:
    def cloneGraph(self, node):
        if node is None:
            return None
        copies = {node: Node(node.val)}
        queue = [node]
        for old in queue:
            for neighbor in old.neighbors:
                if neighbor not in copies:
                    copies[neighbor] = Node(neighbor.val)
                    queue.append(neighbor)
                copies[old].neighbors.append(copies[neighbor])
        return copies[node]
