class TopSongs {
    private record Song(String title, long plays) {}

    private static final Comparator<Song> RANK =
            Comparator.comparingLong((Song song) -> -song.plays()).thenComparing(Song::title);

    private final int k;
    private final PriorityQueue<Song> weakest = new PriorityQueue<>(RANK.reversed());

    public TopSongs(int k) {
        this.k = k;
    }

    public void registerPlays(String title, int plays) {
        weakest.add(new Song(title, plays));
        if (weakest.size() > k) {
            weakest.poll();
        }
    }

    public List<String> topK() {
        List<Song> songs = new ArrayList<>(weakest);
        songs.sort(RANK);
        List<String> titles = new ArrayList<>();
        for (Song song : songs) {
            titles.add(song.title());
        }
        return titles;
    }
}
