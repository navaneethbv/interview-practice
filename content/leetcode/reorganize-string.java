class Solution {
    public String reorganizeString(String s) {
        int[] counts = new int[26];
        for (char character : s.toCharArray()) {
            counts[character - 'a']++;
        }
        PriorityQueue<int[]> heap = new PriorityQueue<>(
                (first, second) -> Integer.compare(second[1], first[1]));
        for (int index = 0; index < counts.length; index++) {
            if (counts[index] > 0) {
                heap.add(new int[]{index, counts[index]});
            }
        }
        StringBuilder output = new StringBuilder();
        int[] previous = null;
        while (!heap.isEmpty()) {
            int[] current = heap.remove();
            output.append((char) ('a' + current[0]));
            current[1]--;
            if (previous != null && previous[1] > 0) {
                heap.add(previous);
            }
            previous = current;
        }
        return output.length() == s.length() ? output.toString() : "";
    }
}
