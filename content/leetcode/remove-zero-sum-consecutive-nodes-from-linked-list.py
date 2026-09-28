class Solution:
    def removeZeroSumSublists(self, head):
        dummy = ListNode(0, head)
        last_node_for_sum = {}
        prefix_sum = 0
        node = dummy
        while node:
            prefix_sum += node.val
            last_node_for_sum[prefix_sum] = node
            node = node.next

        prefix_sum = 0
        node = dummy
        while node:
            prefix_sum += node.val
            node.next = last_node_for_sum[prefix_sum].next
            node = node.next
        return dummy.next
