class Solution {
    public int minAddToMakeValid(String s) {
        int unmatchedOpen = 0;
        int missingOpen = 0;
        for (int index = 0; index < s.length(); index++) {
            if (s.charAt(index) == '(') {
                unmatchedOpen++;
            } else if (unmatchedOpen > 0) {
                unmatchedOpen--;
            } else {
                missingOpen++;
            }
        }
        return unmatchedOpen + missingOpen;
    }
}
