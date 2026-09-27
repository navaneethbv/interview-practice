class Solution {
    public boolean isStrobogrammatic(String num) {
        String digits = "01689";
        String rotated = "01986";
        int left = 0;
        int right = num.length() - 1;
        while (left <= right) {
            int position = digits.indexOf(num.charAt(left));
            if (position < 0 || rotated.charAt(position) != num.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
