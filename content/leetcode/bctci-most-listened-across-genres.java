class Solution {
    public List<String> mostListened(List<List<String>> titles, int[][] plays, int k) {
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> plays[a[0]][a[1]] != plays[b[0]][b[1]]
                ? Integer.compare(plays[b[0]][b[1]], plays[a[0]][a[1]])
                : a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
        for (int genre = 0; genre < titles.size(); genre++) {
            heap.add(new int[] {genre, 0});
        }
        List<String> result = new ArrayList<>();
        while (result.size() < k) {
            int[] next = heap.poll();
            result.add(titles.get(next[0]).get(next[1]));
            if (next[1] + 1 < titles.get(next[0]).size()) {
                heap.add(new int[] {next[0], next[1] + 1});
            }
        }
        return result;
    }
}
