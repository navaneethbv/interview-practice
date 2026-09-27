class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int[] previous = new int[text2.length() + 1];
        for (int index = 0; index < text1.length(); index++) {
            char first = text1.charAt(index);
            int[] current = new int[previous.length];
            for (int column = 0; column < text2.length(); column++) {
                if (first == text2.charAt(column)) {
                    current[column + 1] = previous[column] + 1;
                } else {
                    current[column + 1] = Math.max(previous[column + 1], current[column]);
                }
            }
            previous = current;
        }
        return previous[text2.length()];
    }
}
