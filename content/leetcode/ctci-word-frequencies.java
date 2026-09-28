class WordFrequencies {
    private final Map<String, Integer> counts = new HashMap<>();

    public WordFrequencies(String[] book) {
        for (String word : book) {
            counts.merge(word.toLowerCase(Locale.ROOT), 1, Integer::sum);
        }
    }

    public int getFrequency(String word) {
        return counts.getOrDefault(word.toLowerCase(Locale.ROOT), 0);
    }
}
