class Solution {
    public List<String> kMostPlayed(String[] titles, int[] plays, int k) {
        Comparator<Integer> rank = (a, b) -> plays[a] != plays[b] ? Integer.compare(plays[b], plays[a]) : titles[a].compareTo(titles[b]);
        PriorityQueue<Integer> weakest = new PriorityQueue<>(rank.reversed());
        for (int i = 0; i < titles.length; i++) {
            weakest.add(i);
            if (weakest.size() > k) {
                weakest.poll();
            }
        }
        List<String> result = new ArrayList<>();
        for (int index : weakest) {
            result.add(titles[index]);
        }
        return result;
    }
}
