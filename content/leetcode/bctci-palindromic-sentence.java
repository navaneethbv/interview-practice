class Solution {
    public boolean isPalindromicSentence(String s) {
        int left = 0;
        int right = s.length() - 1;
        while (left < right) {
            if (!isLetter(s.charAt(left))) {
                left++;
            } else if (!isLetter(s.charAt(right))) {
                right--;
            } else if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            } else {
                left++;
                right--;
            }
        }
        return true;
    }

    private boolean isLetter(char character) {
        char lower = Character.toLowerCase(character);
        return lower >= 'a' && lower <= 'z';
    }
}
