class Solution {
    public boolean isOneEditDistance(String s, String t) {
        if (s.length() > t.length()) {
            return isOneEditDistance(t, s);
        }
        if (t.length() - s.length() > 1) {
            return false;
        }
        for (int index = 0; index < s.length(); index++) {
            if (s.charAt(index) != t.charAt(index)) {
                if (s.length() == t.length()) {
                    return s.substring(index + 1).equals(t.substring(index + 1));
                }
                return s.substring(index).equals(t.substring(index + 1));
            }
        }
        return t.length() == s.length() + 1;
    }
}
