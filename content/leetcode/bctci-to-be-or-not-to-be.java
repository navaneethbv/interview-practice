class Solution {
    public List<String> shakespearify(String sentence) {
        String[] words = sentence.isEmpty() ? new String[0] : sentence.split(" ");
        List<String> results = new ArrayList<>();
        choose(words, 0, new ArrayList<>(), results);
        return results;
    }

    private void choose(String[] words, int index, List<String> kept, List<String> results) {
        if (index == words.length) {
            results.add(String.join(" ", kept));
            return;
        }
        choose(words, index + 1, kept, results);
        kept.add(words[index]);
        choose(words, index + 1, kept, results);
        kept.remove(kept.size() - 1);
    }
}
