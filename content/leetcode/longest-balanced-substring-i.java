class Solution {
    public int longestBalanced(String s) {
        int answer = 0;
        for (int start = 0; start < s.length(); start++) {
            answer = Math.max(answer, bestFromStart(s, start));
        }
        return answer;
    }

    private int bestFromStart(String s, int start) {
        int[] counts = new int[26];
        int distinct = 0;
        int largest = 0;
        int best = 0;
        for (int end = start; end < s.length(); end++) {
            int index = s.charAt(end) - 'a';
            if (counts[index] == 0) {
                distinct++;
            }
            counts[index]++;
            largest = Math.max(largest, counts[index]);
            int length = end - start + 1;
            if (largest * distinct == length) {
                best = length;
            }
        }
        return best;
    }
}
