class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] counts = new int[26];
        for (char task : tasks) {
            counts[task - 'A']++;
        }
        int maximum = Arrays.stream(counts).max().orElseThrow();
        int tied = 0;
        for (int count : counts) {
            if (count == maximum) {
                tied++;
            }
        }
        int minimumLength = (maximum - 1) * (n + 1) + tied;
        return Math.max(tasks.length, minimumLength);
    }
}
