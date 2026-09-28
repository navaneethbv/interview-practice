class Checker {
    private final int length;
    private final int[] counts = new int[26];

    public Checker(String s) {
        length = s.length();
        for (char letter : s.toCharArray()) {
            counts[letter - 'a']++;
        }
    }

    public boolean expandsInto(String s2) {
        if (s2.length() != length + 1) {
            return false;
        }
        int[] difference = new int[26];
        for (char letter : s2.toCharArray()) {
            difference[letter - 'a']++;
        }
        for (int letter = 0; letter < 26; letter++) {
            if (difference[letter] < counts[letter]) {
                return false;
            }
        }
        return true;
    }
}
