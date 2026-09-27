class Solution {
    public int balancedStringSplit(String s) {
        int balance = 0;
        int parts = 0;
        for (int index = 0; index < s.length(); index++) {
            balance += s.charAt(index) == 'L' ? 1 : -1;
            if (balance == 0) {
                parts++;
            }
        }
        return parts;
    }
}
