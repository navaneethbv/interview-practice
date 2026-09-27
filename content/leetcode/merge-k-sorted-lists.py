import heapq


class Solution:
    def mergeKLists(self, lists):
        heap = [(head.val, list_index, head) for list_index, head in enumerate(lists) if head]
        heapq.heapify(heap)
        dummy = tail = ListNode()
        while heap:
            _, list_index, node = heapq.heappop(heap)
            tail.next = node
            tail = node
            if node.next:
                heapq.heappush(heap, (node.next.val, list_index, node.next))
        return dummy.next
