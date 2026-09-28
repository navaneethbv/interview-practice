class Solution {
    public int indexOf(String s, String t) {
        for (int start = 0; start + t.length() <= s.length(); start++) {
            int offset = 0;
            while (offset < t.length() && s.charAt(start + offset) == t.charAt(offset)) {
                offset++;
            }
            if (offset == t.length()) {
                return start;
            }
        }
        return -1;
    }
}
