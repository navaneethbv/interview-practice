function delNodes(root: TreeNode | null, to_delete: number[]): Array<TreeNode | null> {
    const deleted = new Set(to_delete);
    const forest: TreeNode[] = [];
    const visit = (node: TreeNode | null, isRoot: boolean): TreeNode | null => {
        if (!node) return null;
        const remove = deleted.has(node.val);
        if (isRoot && !remove) forest.push(node);
        node.left = visit(node.left, remove);
        node.right = visit(node.right, remove);
        return remove ? null : node;
    };
    visit(root, true);
    return forest;
}
