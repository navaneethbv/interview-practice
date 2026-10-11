function invertTree(root: TreeNode | null): TreeNode | null {
    if (!root) return null;
    const left = invertTree(root.right);
    root.right = invertTree(root.left);
    root.left = left;
    return root;
}
