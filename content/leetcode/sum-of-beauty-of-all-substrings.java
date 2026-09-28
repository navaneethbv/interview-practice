class Solution {
    public int beautySum(String s) {
        int total = 0;
        for (int start = 0; start < s.length(); start++) {
            int[] counts = new int[26];
            for (int end = start; end < s.length(); end++) {
                counts[s.charAt(end) - 'a']++;
                total += beauty(counts);
            }
        }
        return total;
    }

    private int beauty(int[] counts) {
        int smallest = Integer.MAX_VALUE;
        int largest = 0;
        for (int count : counts) {
            if (count > 0) {
                smallest = Math.min(smallest, count);
                largest = Math.max(largest, count);
            }
        }
        return largest - smallest;
    }
}
