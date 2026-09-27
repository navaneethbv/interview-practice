class Solution {
    public char findTheDifference(String s, String t) {
        char difference = 0;
        for (int index = 0; index < s.length(); index++) {
            difference ^= s.charAt(index);
        }
        for (int index = 0; index < t.length(); index++) {
            difference ^= t.charAt(index);
        }
        return difference;
    }
}
