class Solution {
    public boolean hasAllCodes(String s, int k) {
        int required = 1 << k;
        if (s.length() - k + 1 < required) {
            return false;
        }
        boolean[] seen = new boolean[required];
        int found = 0;
        int value = 0;
        int mask = required - 1;
        for (int index = 0; index < s.length(); index++) {
            value = ((value << 1) | (s.charAt(index) - '0')) & mask;
            if (index >= k - 1 && !seen[value]) {
                seen[value] = true;
                found++;
            }
        }
        return found == required;
    }
}
