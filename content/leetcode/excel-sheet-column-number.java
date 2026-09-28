class Solution {
    public int titleToNumber(String columnTitle) {
        int result = 0;
        for (int index = 0; index < columnTitle.length(); index++) {
            char letter = columnTitle.charAt(index);
            int value = letter - 'A' + 1;
            result = result * 26 + value;
        }
        return result;
    }
}
