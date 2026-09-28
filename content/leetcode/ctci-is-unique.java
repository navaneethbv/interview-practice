class Solution {
    public boolean isUnique(String s) {
        java.util.HashSet<Integer> seen = new java.util.HashSet<>();
        for (int offset = 0; offset < s.length();) {
            int character = s.codePointAt(offset);
            if (!seen.add(character)) {
                return false;
            }
            offset += Character.charCount(character);
        }
        return true;
    }
}
