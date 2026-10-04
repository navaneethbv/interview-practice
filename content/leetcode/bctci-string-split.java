class Solution {
    public List<String> split(String s, String c) {
        List<String> pieces = new ArrayList<>();
        if (s.isEmpty()) {
            return pieces;
        }
        int delimiter = c.codePointAt(0);
        int start = 0;
        for (int index = 0; index < s.length();) {
            int codePoint = s.codePointAt(index);
            if (codePoint == delimiter) {
                pieces.add(s.substring(start, index));
                index += Character.charCount(codePoint);
                start = index;
            } else {
                index += Character.charCount(codePoint);
            }
        }
        pieces.add(s.substring(start));
        return pieces;
    }
}
