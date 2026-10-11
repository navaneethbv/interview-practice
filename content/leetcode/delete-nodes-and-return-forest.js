const delNodes = function(root, to_delete) {
    const deleted = new Set(to_delete);
    const forest = [];
    const visit = (node, isRoot) => {
        if (!node) return null;
        const remove = deleted.has(node.val);
        if (isRoot && !remove) forest.push(node);
        node.left = visit(node.left, remove);
        node.right = visit(node.right, remove);
        return remove ? null : node;
    };
    visit(root, true);
    return forest;
};
