func delNodes(root *TreeNode, to_delete []int) []*TreeNode {
	deleted := map[int]bool{}
	for _, v := range to_delete {
		deleted[v] = true
	}
	var forest []*TreeNode
	var visit func(node *TreeNode, isRoot bool) *TreeNode
	visit = func(node *TreeNode, isRoot bool) *TreeNode {
		if node == nil {
			return nil
		}
		remove := deleted[node.Val]
		if isRoot && !remove {
			forest = append(forest, node)
		}
		node.Left = visit(node.Left, remove)
		node.Right = visit(node.Right, remove)
		if remove {
			return nil
		}
		return node
	}
	visit(root, true)
	return forest
}
