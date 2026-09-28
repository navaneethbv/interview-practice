class Solution {
    public boolean oneAway(String first, String second) {
        int firstLength = first.codePointCount(0, first.length());
        int secondLength = second.codePointCount(0, second.length());
        if (Math.abs(firstLength - secondLength) > 1) {
            return false;
        }
        if (firstLength > secondLength) {
            String temp = first;
            first = second;
            second = temp;
        }
        int left = 0;
        int right = 0;
        int differences = 0;
        while (left < first.length() && right < second.length()) {
            int firstCharacter = first.codePointAt(left);
            int secondCharacter = second.codePointAt(right);
            if (firstCharacter == secondCharacter) {
                left += Character.charCount(firstCharacter);
                right += Character.charCount(secondCharacter);
                continue;
            }
            differences++;
            if (differences > 1) {
                return false;
            }
            if (firstLength == secondLength) {
                left += Character.charCount(firstCharacter);
            }
            right += Character.charCount(secondCharacter);
        }
        return true;
    }
}
