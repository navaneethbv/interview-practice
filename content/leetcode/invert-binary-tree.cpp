class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        TreeNode* left = invertTree(root->right);
        root->right = invertTree(root->left);
        root->left = left;
        return root;
    }
};
