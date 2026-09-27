class Solution {
    public boolean isAlienSorted(String[] words, String order) {
        int[] rank = new int[26];
        for (int index = 0; index < order.length(); index++) {
            rank[order.charAt(index) - 'a'] = index;
        }
        for (int index = 0; index + 1 < words.length; index++) {
            if (!inOrder(words[index], words[index + 1], rank)) {
                return false;
            }
        }
        return true;
    }

    private boolean inOrder(String first, String second, int[] rank) {
        int length = Math.min(first.length(), second.length());
        for (int index = 0; index < length; index++) {
            char left = first.charAt(index);
            char right = second.charAt(index);
            if (left != right) {
                return rank[left - 'a'] < rank[right - 'a'];
            }
        }
        return first.length() <= second.length();
    }
}
