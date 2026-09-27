class Solution:
    def isPalindrome(self, head):
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        previous = None
        while slow:
            following = slow.next
            slow.next = previous
            previous = slow
            slow = following
        while previous:
            if head.val != previous.val:
                return False
            head = head.next
            previous = previous.next
        return True
