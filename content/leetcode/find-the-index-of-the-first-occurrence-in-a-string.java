class Solution {
    public int strStr(String haystack, String needle) {
        if (needle.length() == 0) {
            return 0;
        }

        int[] prefixLengths = buildPrefixLengths(needle);
        int matchLength = 0;
        for (int index = 0; index < haystack.length(); index++) {
            char character = haystack.charAt(index);
            while (matchLength > 0 && character != needle.charAt(matchLength)) {
                matchLength = prefixLengths[matchLength - 1];
            }
            if (character == needle.charAt(matchLength)) {
                matchLength++;
            }
            if (matchLength == needle.length()) {
                return index - needle.length() + 1;
            }
        }
        return -1;
    }

    private int[] buildPrefixLengths(String needle) {
        int[] prefixLengths = new int[needle.length()];
        int prefixEnd = 0;
        for (int index = 1; index < needle.length(); index++) {
            while (prefixEnd > 0 && needle.charAt(index) != needle.charAt(prefixEnd)) {
                prefixEnd = prefixLengths[prefixEnd - 1];
            }
            if (needle.charAt(index) == needle.charAt(prefixEnd)) {
                prefixEnd++;
            }
            prefixLengths[index] = prefixEnd;
        }
        return prefixLengths;
    }
}
