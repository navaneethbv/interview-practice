class Solution {
    public boolean checkStrings(String s1, String s2) {
        int[][] first = countsByParity(s1);
        int[][] second = countsByParity(s2);
        for (int parity = 0; parity < 2; parity++) {
            for (int letter = 0; letter < 26; letter++) {
                if (first[parity][letter] != second[parity][letter]) {
                    return false;
                }
            }
        }
        return true;
    }

    private int[][] countsByParity(String value) {
        int[][] counts = new int[2][26];
        for (int index = 0; index < value.length(); index++) {
            int parity = index % 2;
            counts[parity][value.charAt(index) - 'a']++;
        }
        return counts;
    }
}
