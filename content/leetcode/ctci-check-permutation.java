class Solution {
    public boolean checkPermutation(String first, String second) {
        if (first.length() != second.length()) {
            return false;
        }
        java.util.HashMap<Integer, Integer> counts = new java.util.HashMap<>();
        for (int offset = 0; offset < first.length();) {
            int value = first.codePointAt(offset);
            counts.put(value, counts.getOrDefault(value, 0) + 1);
            offset += Character.charCount(value);
        }
        for (int offset = 0; offset < second.length();) {
            int value = second.codePointAt(offset);
            Integer count = counts.get(value);
            if (count == null || count == 0) {
                return false;
            }
            counts.put(value, count - 1);
            offset += Character.charCount(value);
        }
        return true;
    }
}
