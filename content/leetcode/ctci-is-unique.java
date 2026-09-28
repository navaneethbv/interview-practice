class Solution {
    public boolean isUnique(String s) {
        java.util.HashSet<Character> seen = new java.util.HashSet<>();
        for (int i = 0; i < s.length(); i++) {
            if (!seen.add(s.charAt(i))) {
                return false;
            }
        }
        return true;
    }
}
