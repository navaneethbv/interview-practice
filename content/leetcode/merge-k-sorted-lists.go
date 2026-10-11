import "sort"

func mergeKLists(lists []*ListNode) *ListNode {
	var values []int
	for _, node := range lists {
		for ; node != nil; node = node.Next {
			values = append(values, node.Val)
		}
	}
	sort.Ints(values)
	dummy := &ListNode{}
	tail := dummy
	for _, v := range values {
		tail.Next = &ListNode{Val: v}
		tail = tail.Next
	}
	return dummy.Next
}
