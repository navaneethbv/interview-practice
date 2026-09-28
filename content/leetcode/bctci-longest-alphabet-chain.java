class Solution {
    public int solve(String arr) {
        int[] counts = new int[26];
        for (int i = 0; i < arr.length(); i++) {
            counts[arr.charAt(i) - 'a']++;
        }
        int cycles = Arrays.stream(counts).min().getAsInt();
        int best = 0;
        int run = 0;
        for (int index = 0; index < 52; index++) {
            run = counts[index % 26] > cycles ? run + 1 : 0;
            best = Math.max(best, run);
        }
        return cycles * 26 + best;
    }
}
