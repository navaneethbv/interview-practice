class Solution {
public:
    vector<TreeNode*> delNodes(TreeNode* root, vector<int>& to_delete) {
        deleted = unordered_set<int>(to_delete.begin(), to_delete.end());
        visit(root, true);
        return forest;
    }

private:
    unordered_set<int> deleted;
    vector<TreeNode*> forest;

    TreeNode* visit(TreeNode* node, bool isRoot) {
        if (!node) return nullptr;
        bool remove = deleted.count(node->val) > 0;
        if (isRoot && !remove) forest.push_back(node);
        node->left = visit(node->left, remove);
        node->right = visit(node->right, remove);
        return remove ? nullptr : node;
    }
};
