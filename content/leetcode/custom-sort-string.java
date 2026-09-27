class Solution {
    public String customSortString(String order, String s) {
        int[] counts = new int[26];
        for (int index = 0; index < s.length(); index++) {
            counts[s.charAt(index) - 'a']++;
        }
        StringBuilder result = new StringBuilder();
        for (int index = 0; index < order.length(); index++) {
            char character = order.charAt(index);
            appendCopies(result, character, counts[character - 'a']);
            counts[character - 'a'] = 0;
        }
        for (int index = 0; index < counts.length; index++) {
            appendCopies(result, (char) ('a' + index), counts[index]);
        }
        return result.toString();
    }

    private void appendCopies(StringBuilder result, char character, int count) {
        for (int copy = 0; copy < count; copy++) {
            result.append(character);
        }
    }
}
