class Solution:
    def maxProduct(self, root):
        order=[root]
        for node in order:
            if node.left: order.append(node.left)
            if node.right: order.append(node.right)
        sums={None:0}
        for node in reversed(order): sums[node]=node.val+sums[node.left]+sums[node.right]
        total=sums[root]
        return max(sums[node]*(total-sums[node]) for node in order[1:])%1000000007
