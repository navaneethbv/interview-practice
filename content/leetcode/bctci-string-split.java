class Solution {
    public List<String> split(String s, String c) {
        List<String> pieces = new ArrayList<>();
        if (s.isEmpty()) {
            return pieces;
        }
        char delimiter = c.charAt(0);
        int start = 0;
        for (int index = 0; index < s.length(); index++) {
            if (s.charAt(index) == delimiter) {
                pieces.add(s.substring(start, index));
                start = index + 1;
            }
        }
        pieces.add(s.substring(start));
        return pieces;
    }
}
