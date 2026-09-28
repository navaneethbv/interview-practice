class Solution {
    private final StringBuilder message = new StringBuilder();

    public String hiddenMessage(TreeNode root, String[] texts) {
        read(root, texts);
        return message.toString();
    }

    private void read(TreeNode node, String[] texts) {
        if (node == null) {
            return;
        }
        char order = texts[node.val].charAt(0);
        char letter = texts[node.val].charAt(1);
        if (order == 'b') {
            message.append(letter);
        }
        read(node.left, texts);
        if (order == 'i') {
            message.append(letter);
        }
        read(node.right, texts);
        if (order == 'a') {
            message.append(letter);
        }
    }
}
