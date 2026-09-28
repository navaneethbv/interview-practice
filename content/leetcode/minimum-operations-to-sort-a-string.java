class Solution {
    public int minOperations(String s) {
        boolean sorted = true;
        char smallest = 'z';
        char largest = 'a';
        for (int index = 0; index < s.length(); index++) {
            char value = s.charAt(index);
            smallest = (char) Math.min(smallest, value);
            largest = (char) Math.max(largest, value);
            if (index > 0 && s.charAt(index - 1) > value) {
                sorted = false;
            }
        }
        if (sorted) {
            return 0;
        }
        if (s.length() == 2) {
            return -1;
        }
        if (s.charAt(0) == smallest || s.charAt(s.length() - 1) == largest) {
            return 1;
        }
        for (int index = 1; index + 1 < s.length(); index++) {
            if (s.charAt(index) == smallest || s.charAt(index) == largest) {
                return 2;
            }
        }
        return 3;
    }
}
