class Solution {
    public boolean checkPermutation(String first, String second) {
        if (first.length() != second.length()) {
            return false;
        }
        java.util.HashMap<Character, Integer> counts = new java.util.HashMap<>();
        for (int i = 0; i < first.length(); i++) {
            char value = first.charAt(i);
            counts.put(value, counts.getOrDefault(value, 0) + 1);
        }
        for (int i = 0; i < second.length(); i++) {
            char value = second.charAt(i);
            Integer count = counts.get(value);
            if (count == null || count == 0) {
                return false;
            }
            counts.put(value, count - 1);
        }
        return true;
    }
}
