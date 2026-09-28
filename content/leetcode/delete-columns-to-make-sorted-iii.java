class Solution {
    public int minDeletionSize(String[] strs) {
        int columns = strs[0].length();
        int[] longestEndingHere = new int[columns];
        Arrays.fill(longestEndingHere, 1);
        int longest = 1;
        for (int right = 0; right < columns; right++) {
            for (int left = 0; left < right; left++) {
                boolean valid = true;
                for (String row : strs) {
                    if (row.charAt(left) > row.charAt(right)) {
                        valid = false;
                        break;
                    }
                }
                if (valid) {
                    longestEndingHere[right] = Math.max(
                        longestEndingHere[right], longestEndingHere[left] + 1
                    );
                }
            }
            longest = Math.max(longest, longestEndingHere[right]);
        }
        return columns - longest;
    }
}
