class AutocompleteSystem {
    private final Map<String, Integer> counts = new HashMap<>();
    private String prefix = "";

    public AutocompleteSystem(String[] sentences, int[] times) {
        for (int index = 0; index < sentences.length; index++) {
            counts.put(sentences[index], times[index]);
        }
    }

    public List<String> input(char character) {
        if (character == '#') {
            counts.put(prefix, counts.getOrDefault(prefix, 0) + 1);
            prefix = "";
            return new ArrayList<>();
        }

        prefix += character;
        List<String> matches = new ArrayList<>();
        for (String sentence : counts.keySet()) {
            if (sentence.startsWith(prefix)) {
                matches.add(sentence);
            }
        }
        matches.sort((first, second) -> {
            int byFrequency = Integer.compare(
                    counts.get(second), counts.get(first));
            return byFrequency != 0 ? byFrequency : first.compareTo(second);
        });
        return new ArrayList<>(matches.subList(0, Math.min(3, matches.size())));
    }
}
