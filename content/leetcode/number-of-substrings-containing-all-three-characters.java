class Solution {
    public int numberOfSubstrings(String s) {
        int[] last = {-1, -1, -1};
        int total = 0;
        for (int index = 0; index < s.length(); index++) {
            last[s.charAt(index) - 'a'] = index;
            total += Math.min(last[0], Math.min(last[1], last[2])) + 1;
        }
        return total;
    }
}
