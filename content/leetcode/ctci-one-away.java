class Solution {
    public boolean oneAway(String first, String second) {
        if (Math.abs(first.length() - second.length()) > 1) {
            return false;
        }
        if (first.length() > second.length()) {
            String temp = first;
            first = second;
            second = temp;
        }
        int left = 0;
        int right = 0;
        int differences = 0;
        while (left < first.length() && right < second.length()) {
            if (first.charAt(left) == second.charAt(right)) {
                left++;
                right++;
                continue;
            }
            differences++;
            if (differences > 1) {
                return false;
            }
            if (first.length() == second.length()) {
                left++;
            }
            right++;
        }
        return true;
    }
}
