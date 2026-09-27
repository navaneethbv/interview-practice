class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        Map<String, Integer> counts = new HashMap<>();
        for (String word : words) {
            counts.merge(word, 1, Integer::sum);
        }
        List<String> orderedWords = new ArrayList<>(counts.keySet());
        orderedWords.sort((first, second) -> compareWords(first, second, counts));
        return new ArrayList<>(orderedWords.subList(0, k));
    }

    private int compareWords(String first, String second, Map<String, Integer> counts) {
        int frequencyOrder = Integer.compare(counts.get(second), counts.get(first));
        if (frequencyOrder != 0) {
            return frequencyOrder;
        }
        return first.compareTo(second);
    }
}
