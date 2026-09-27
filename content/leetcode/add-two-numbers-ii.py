class Solution:
    def addTwoNumbers(self, l1, l2):
        first = []
        second = []
        while l1:
            first.append(l1.val)
            l1 = l1.next
        while l2:
            second.append(l2.val)
            l2 = l2.next
        carry = 0
        head = None
        while first or second or carry:
            first_digit = first.pop() if first else 0
            second_digit = second.pop() if second else 0
            carry, digit = divmod(first_digit + second_digit + carry, 10)
            node = ListNode(digit)
            node.next = head
            head = node
        return head
