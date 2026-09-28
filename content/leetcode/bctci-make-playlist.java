class Solution {
    public List<String> makePlaylist(List<List<String>> songs) {
        Map<String, Deque<String>> byArtist = new HashMap<>();
        for (List<String> song : songs) {
            byArtist.computeIfAbsent(song.get(1), key -> new ArrayDeque<>()).push(song.get(0));
        }
        PriorityQueue<String> heap = new PriorityQueue<>((a, b) -> byArtist.get(b).size() != byArtist.get(a).size()
                ? Integer.compare(byArtist.get(b).size(), byArtist.get(a).size()) : a.compareTo(b));
        heap.addAll(byArtist.keySet());
        List<String> playlist = new ArrayList<>();
        String held = null;
        while (!heap.isEmpty()) {
            String artist = heap.poll();
            playlist.add(byArtist.get(artist).pop());
            if (held != null) {
                heap.add(held);
            }
            held = byArtist.get(artist).isEmpty() ? null : artist;
        }
        return held != null ? new ArrayList<>() : playlist;
    }
}
