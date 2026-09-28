class Solution {
    public List<String> thesaurusly(String sentence, List<List<String>> synonyms) {
        Map<String, List<String>> options = new HashMap<>();
        for (List<String> entry : synonyms) {
            options.put(entry.get(0), entry.subList(1, entry.size()));
        }
        String[] words = sentence.split(" ");
        List<String> results = new ArrayList<>();
        build(words, options, 0, new ArrayList<>(), results);
        return results;
    }

    private void build(String[] words, Map<String, List<String>> options, int index, List<String> chosen, List<String> results) {
        if (index == words.length) {
            results.add(String.join(" ", chosen));
            return;
        }
        for (String word : options.getOrDefault(words[index], List.of(words[index]))) {
            chosen.add(word);
            build(words, options, index + 1, chosen, results);
            chosen.remove(chosen.size() - 1);
        }
    }
}
