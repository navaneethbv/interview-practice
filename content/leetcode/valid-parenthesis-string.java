class Solution {
    public boolean checkValidString(String s) {
        int minimumOpen = 0;
        int maximumOpen = 0;
        for (int characterIndex = 0; characterIndex < s.length(); characterIndex++) {
            char character = s.charAt(characterIndex);
            if (character == '(') {
                minimumOpen++;
                maximumOpen++;
            } else if (character == ')') {
                minimumOpen--;
                maximumOpen--;
            } else {
                minimumOpen--;
                maximumOpen++;
            }
            if (maximumOpen < 0) {
                return false;
            }
            minimumOpen = Math.max(minimumOpen, 0);
        }
        return minimumOpen == 0;
    }
}
