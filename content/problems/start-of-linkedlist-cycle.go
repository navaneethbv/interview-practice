func findCycleStart(head *ListNode) *ListNode {
	slow, fast := head, head
	for fast != nil && fast.Next != nil {
		slow, fast = slow.Next, fast.Next.Next
		if slow == fast {
			break
		}
	}
	p := head
	for p != slow {
		p, slow = p.Next, slow.Next
	}
	return p
}
