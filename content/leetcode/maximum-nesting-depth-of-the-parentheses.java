class Solution {
    public int maxDepth(String s) {
        int depth = 0;
        int greatest = 0;
        for (int index = 0; index < s.length(); index++) {
            char character = s.charAt(index);
            if (character == '(') {
                depth++;
                greatest = Math.max(greatest, depth);
            } else if (character == ')') {
                depth--;
            }
        }
        return greatest;
    }
}
